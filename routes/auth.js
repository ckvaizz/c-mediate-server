var express = require("express");
var router = express.Router();
const {
  login,
  sendOtp,
  checkOtp,
  createPassword,
} = require("../controllers/auth");
const {
  loginValidator,
  sendOtpValidator,
  checkOtpValidator,
  createPasswordValidator,
} = require("../middleware/validator");
const { checkValidator } = require("../middleware/auth");

router.post("/login", loginValidator, checkValidator, login);

router.post("/register/send-otp", sendOtpValidator, checkValidator, sendOtp);

router.post(
  "/register/verify-otp",
  checkOtpValidator,
  checkValidator,
  checkOtp
);
router.post(
  "/register/create-password",
  createPasswordValidator,
  checkValidator,
  createPassword
);

module.exports = router;
