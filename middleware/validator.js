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
    check("otp").isLength(4),
  ],
  createPasswordValidator:[
      check("mobile").isMobilePhone(),
      check("password").isLength({min:3}),
      check("otp").isLength(4)
  ],
  changePasswordValidator:[
    check("oldPassword").isLength({min:3}),
    check("newPassword").isLength({min:3})
  ],
  addSuggestionValidator:[
    check("message").isLength({min:3})
  ],
  editSuggestionValidator:[
    check("_id").isMongoId(),
    check("message").isLength({min:3})
  ],
  deleteValidator:[
    check("_id").isMongoId()
  ],
  blockSuggestionValidation:[
    check("_id").isMongoId(),
    check("status").isBoolean()
  ],
  addComplaintValidator:[
    check("message").exists().notEmpty(),
    check("image").optional().isObject(),
    
  ]
};
