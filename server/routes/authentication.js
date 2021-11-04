const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");
const UserService = require("../services/UserService");
const TokenService = require("../services/TokenService");
const bcrypt = require("bcrypt");

router.post(
  "/signup",
  check("username")
    .notEmpty()
    .withMessage("username_null")
    .bail()
    .isLength({ min: 3, max: 32 })
    .withMessage("username_size"),
  check("email")
    .notEmpty()
    .withMessage("email_null")
    .bail()
    .isEmail()
    .withMessage("email_invalid")
    .bail()
    .custom(async (email) => {
      const user = await UserService.findByEmail(email);
      if (user.length > 0) {
        throw new Error("email in use");
      }
    }),
  check("password")
    .notEmpty()
    .withMessage("password_null")
    .bail()
    .isLength({ min: 6 })
    .withMessage("password_size")
    .bail()
    .matches(/^(?=.*[a-z])(?=.*\d).*$/)
    .withMessage("password_pattern"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return next(new ValidationException(errors.array()));
      return res.send(errors.array());
    }
    try {
      await UserService.save(req.body);
      return res.send({ msg: "All signed up", success: true });
    } catch (err) {
      return res.send([{ msg: "There was a server error. Try again later" }]);
    }
  }
);

router.post("/login", check("email").isEmail(), async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send(errors.array());
  }
  const { email, password } = req.body;
  const userResponse = await UserService.findByEmail(email);
  const user = userResponse[0];
  if (!user) {
    return res.send({ msg: "email not found", error: true });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.send({ msg: "incorrect password", error: true });
  }
  if (user.inactive) {
    return res.send({ msg: "innactive account", error: true });
  }
  const token = await TokenService.createToken(user);
  res.send({
    id: user.id,
    username: user.username,
    image: user.image,
    token,
  }); 
});

router.post("/token/remove-token", async (req, res) => {
  const token = req.body.token;
  try {
    const logout = await TokenService.deleteToken(token);
    if (logout.serverStatus === 34) {
      res.send({success: true})
    } else {
      res.send({msg: "logged out but dont know why"})
    }
  } catch (err) {
    res.send({error: true, msg: "Something went wrong"})
  }
  
})

router.post("/token/:token", async (req, res, next) => {
  const token = req.params.token;
  try {
    await TokenService.activateToken(token);
    return res.send({ msg: "Your account is activated" });
  } catch (err) {
    return res.send({ error: true, msg: "Could not activate account" });
  }
});

router.get("/get-token", async (req, res, next) => {
  const token = req.query.token;
  try {
    const tokenInDB = await UserService.findToken(token);
    if (tokenInDB) {
      return res.send({ tokenInDB: true, id: tokenInDB[0].user_id });
    } else {
      return res.send({ tokenInDB: false });
    }
  } catch (err) {
    return res.send({ tokenInDb: false });
  }
});

module.exports = router;