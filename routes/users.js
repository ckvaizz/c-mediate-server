var express = require("express");
var router = express.Router();
const { checkSchema } = require("express-validator");
const { auth, isManagement, checkValidator } = require("../middleware/auth");
const {
  addUser,
  changePassword,
  sentOtp_FP,
  verifyOtp_FP,
  unBlockUser,
  editManagement,
} = require("../controllers/user");
const {
  addUserValidator,
  changePasswordValidator,
  sendOtpValidator,
  checkOtpValidator,
  idValidator,
  editManagementValidator,
} = require("../middleware/validator");



router.post(
  "/add",
  auth,
  isManagement,
  addUserValidator,
  checkValidator,
  addUser
);
router.post(
  "/change-password",
  auth,
  changePasswordValidator,
  checkValidator,
  changePassword
);

router.post("/forgot/sendOtp", sendOtpValidator, checkValidator, sentOtp_FP);

router.post(
  "/forgot/checkOtp",
  checkOtpValidator,
  checkValidator,
  verifyOtp_FP
);

router.post('/unblock',auth,isManagement,idValidator,checkValidator,unBlockUser)

router.post('/managementEdit',auth,isManagement,editManagementValidator,checkValidator,editManagement)
module.exports = router;
