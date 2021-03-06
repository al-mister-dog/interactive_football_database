const express = require("express");
const router = express.Router();
const validate = require("../middleware/validation");
const { check, validationResult } = require("express-validator");
const UserService = require("../services/UserService");
const TokenService = require("../services/TokenService");
const AuthenticationException = require("../errors/AuthenticationException");
const ValidationException = require("../errors/ValidationErrors")
const bcrypt = require("bcrypt");

router.post(
  "/signup",
  check("username")
    .notEmpty()
    .withMessage("Please enter a valid username")
    .bail()
    .isLength({ min: 3, max: 32 })
    .withMessage("Username must be between 3 and 32 characters"),
  check("email")
    .notEmpty()
    .withMessage("Please enter a valid email")
    .bail()
    .isEmail()
    .withMessage("Please enter a valid email")
    .bail()
    .custom(async (email) => {
      const user = await UserService.findByEmail(email);
      if (user.length > 0) {
        throw new Error("email in use");
      }
    }),
  check("password")
    .notEmpty()
    .withMessage("please enter a valid password")
    .bail()
    .isLength({ min: 6 })
    .withMessage("password must be 6 characters or more")
    .bail()
    .matches(/^(?=.*[a-z])(?=.*\d).*$/)
    .withMessage("please enter a valid password"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationException(errors.array()));
    }
    try {
      await UserService.save(req.body);
      return res.send({ msg: "All signed up", success: true });
    } catch (err) {
      next(err);
    }
  }
);

router.post("/login", check("email").isEmail(), async (req, res, next) => {
  const errors = validationResult(req);
  const hasErrors = !errors.isEmpty();
  if (hasErrors) {
    return next(
      new AuthenticationException(
        "The email address you entered isn't connected to an account"
      )
    );
  }
  const { email, password } = req.body;
  const userResponse = await UserService.findByEmail(email);
  const user = userResponse[0];
  if (!user) {
    return next(new AuthenticationException("Email not found"));
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return next(new AuthenticationException("Incorrect password"));
  }
  if (user.inactive) {
    return next(new AuthenticationException("Inactive account"));
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
    await TokenService.deleteToken(token);
    res.send({ success: true });
  } catch (err) {
    return next(new ServerException());
  }
});

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
