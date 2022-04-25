const { check } = require("express-validator");


module.exports = {
  addUserValidator: [
    check("mobile").isMobilePhone(),
    check("name").trim().isLength({ min: 3 }).exists(),
  ],
  loginValidator: [
    check("mobile").isMobilePhone(),
    check("password").trim().isLength({ min: 3 }),
  ],
  sendOtpValidator: [check("mobile").isMobilePhone()],
  checkOtpValidator: [
    check("mobile").isMobilePhone(),
    check("otp").isLength(4),
  ],
  createPasswordValidator: [
    check("mobile").isMobilePhone(),
    check("password").trim().isLength({ min: 3 }),
    check("otp").trim().isLength(4),
  ],
  changePasswordValidator: [
    check("oldPassword").trim().isLength({ min: 3 }),
    check("newPassword").trim().isLength({ min: 3 }),
  ],
  addSuggestionValidator: [check("message").isLength({ min: 3 })],
  editSuggestionValidator: [
    check("_id").isMongoId(),
    check("message").trim().isLength({ min: 3 }),
  ],
  deleteValidator: [check("_id").isMongoId()],
  blockSuggestionValidation: [
    check("_id").isMongoId(),
    check("status").isBoolean(),
  ],
  addComplaintValidator: [
    check("message").trim().exists().notEmpty(),
    check("image").optional().isObject(),
  ],
  editComplaintValidator: [
    check("_id").isMongoId(),
    check("message").trim().exists().notEmpty(),
    check("image").optional().isObject(),
  ],
  replyValidator:[
    check("_id").isMongoId(),
    check("reply").trim().exists().notEmpty()
  ],
  addAnnouncementvalidator:[
    check("title").trim().exists().notEmpty(),
    check("message").trim().exists().notEmpty(),
    check("dueDate").exists().notEmpty(),
     check("pdf").optional().isObject()
  ],
  editAnnouncementValidator:[
    check("title").trim().exists().notEmpty(),
    check("message").trim().exists().notEmpty(),
    check("dueDate").exists().notEmpty(),
    check("pdf").optional().isObject(),
    check("_id").isMongoId()
  ],
  idValidator:[
    check('_id').exists().notEmpty().isMongoId()
  ],
  editUserValidator:[
    check('_id').exists().notEmpty().isMongoId(),
    check('name').exists().notEmpty(),
    check('mobile').exists().notEmpty()
  ]
};
