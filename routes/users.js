var express = require("express");
var router = express.Router();
const { checkSchema } = require("express-validator");
const { auth, isManagement, checkValidator } = require("../middleware/auth");
const { addUser, changePassword } = require("../controllers/user");
const {
  addUserValidator,
  changePasswordValidator,
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

module.exports = router;
