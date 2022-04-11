var express = require("express");
const {
  getBlockRequiest,
  blockComplaint,
  rejectBlockReq,
  
} = require("../controllers/admin");
const { auth, isAdmin, checkValidator } = require("../middleware/auth");
const { idValidator } = require("../middleware/validator");
var router = express.Router();


router.get("/complaint/bRequest", auth, isAdmin, getBlockRequiest);

router.post(
  "/complaint/block",
  auth,
  isAdmin,
  idValidator,
  checkValidator,
  blockComplaint
);

router.get("/complaint/:_id", auth, isAdmin, rejectBlockReq);



module.exports = router;
