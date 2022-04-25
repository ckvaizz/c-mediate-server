var express = require("express");
var router = express.Router();

const { auth, isManagement, checkValidator } = require("../middleware/auth");
const {
  addUser,
  changePassword,
  sentOtp_FP,
  verifyOtp_FP,
  unBlockUser,
  editManagement,
  getUsers,
  deleteAllOld,
  editUser,
} = require("../controllers/user");
const {
  addUserValidator,
  changePasswordValidator,
  sendOtpValidator,
  checkOtpValidator,
  idValidator,
  editUserValidator,
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

router.post(
  "/unblock",
  auth,
  isManagement,
  idValidator,
  checkValidator,
  unBlockUser
);

router.post(
  "/managementEdit",
  auth,
  isManagement,
  editUserValidator,
  checkValidator,
  editManagement
);

router.get("/get/:status", auth, isManagement, getUsers);

router.post("/delete/allOld", auth, isManagement, deleteAllOld);

router.post(
  "/edit",
  auth,
  isManagement,
  editUserValidator,
  checkValidator,
  editUser
);

module.exports = router;
