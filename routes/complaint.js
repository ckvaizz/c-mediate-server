var express = require("express");
var router = express.Router();
const {
  auth,
  checkValidator,
  isManagement,
  checkUserPermission,
} = require("../middleware/auth");
const {
  addComplaintValidator,
  editComplaintValidator,
  deleteValidator,
  replyValidator,
} = require("../middleware/validator");
const {
  addComplaint,
  editComplaint,
  getComplaint,
  getAllBlockedComplaint,
  deleteComplaint,
  blockReqComplaint,
  replyComplaint,
  reportComplaint,
  unBlockComplaint,
} = require("../controllers/complaint");

/* GET home page. */
router.post(
  "/add",
  auth,
  checkUserPermission,
  addComplaintValidator,
  checkValidator,
  addComplaint
);

router.post(
  "/edit",
  auth,
  checkUserPermission,
  editComplaintValidator,
  checkValidator,
  editComplaint
);

router.post("/delete", auth, deleteValidator, checkValidator, deleteComplaint);

router.post(
  "/block-req",
  auth,
  isManagement,
  deleteValidator,
  checkValidator,
  blockReqComplaint
);

router.post(
  "/reply",
  auth,
  isManagement,
  replyValidator,
  checkValidator,
  replyComplaint
);

router.post(
  "/report",
  auth,
  checkUserPermission,
  deleteValidator,
  checkValidator,
  reportComplaint
);

router.post(
  "/unblock",
  auth,
  isManagement,
  deleteValidator,
  checkValidator,
  unBlockComplaint
);

router.get("/get/:status", auth, getComplaint);

router.get("/getAllBlocked", auth, isManagement, getAllBlockedComplaint);

module.exports = router;
