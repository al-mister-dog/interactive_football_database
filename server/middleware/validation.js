const { check } = require("express-validator");

exports.email = (req, res, next) => {
  check("email").isEmail();
  next();
};

exports.user = (req, res, next) => {
  check("username")
    .notEmpty()
    .withMessage("Please enter a valid username")
    .bail()
    .isLength({ min: 3, max: 32 })
    .withMessage("Please enter a valid username"),
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
          return res.status(500)
        }
      }),
    check("password")
      .notEmpty()
      .withMessage("please enter a valid password")
      .bail()
      .isLength({ min: 6 })
      .withMessage("please enter a valid password")
      .bail()
      .matches(/^(?=.*[a-z])(?=.*\d).*$/)
      .withMessage("please enter a valid password");

  next();
};
