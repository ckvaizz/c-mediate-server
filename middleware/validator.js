const { check } = require("express-validator");
module.exports = {
  addUserValidator: [
    check("mobile").isMobilePhone(),
    check("name").isLength({ min: 3 }).exists(),
  ],
  loginValidator: [
    check("mobile").isMobilePhone(),
    check("password").isLength({ min: 3 }),
  ],
  sendOtpValidator: [check("mobile").isMobilePhone()],
  checkOtpValidator: [
    check("mobile").isMobilePhone(),
    check("otp").isLength({ min: 4 }),
  ],
  createPasswordValidator:[
      check("mobile").isMobilePhone(),
      check("password").isLength({min:3})
  ]
};
