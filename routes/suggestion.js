var express = require("express");
var router = express.Router();
const { auth, checkValidator, isManagement, checkUserPermission } = require("../middleware/auth");
const {
  addSuggestionValidator,
  editSuggestionValidator,
  deleteValidator,
  blockSuggestionValidation,
} = require("../middleware/validator");
const {
  addSuggestion,
  editSuggestion,
  deleteSuggestion,
  blockSuggestion,
  getSuggestion,
  getAllBlockedSuggestion,
  getAllSuggestion
} = require("../controllers/suggestion");

router.post(
  "/add",
  auth,
  checkUserPermission,
  addSuggestionValidator,
  checkValidator,
  addSuggestion
);
router.post(
  "/edit",
  auth,
  checkUserPermission,
  editSuggestionValidator,
  checkValidator,
  editSuggestion
);
router.post("/delete", auth,checkUserPermission, deleteValidator, checkValidator, deleteSuggestion);
router.post(
  "/block",
  auth,
  isManagement,
  blockSuggestionValidation,
  checkValidator,
  blockSuggestion
);

router.get('/get/:status',auth,getSuggestion)
router.get('/getAllBlocked',auth,isManagement,getAllBlockedSuggestion)
router.get('/getAll',auth,isManagement,getAllSuggestion)
module.exports = router;
