var express = require('express');
const { getBlockRequiest, blockComplaint } = require('../controllers/admin');
const { auth, isAdmin, checkValidator } = require('../middleware/auth');
const { idValidator } = require('../middleware/validator');
var router = express.Router();

/* GET home page. */
router.get('/complaint/bRequest',auth,isAdmin,getBlockRequiest);

router.post('/complaint/block',auth,isAdmin,idValidator,checkValidator,blockComplaint)

module.exports = router;