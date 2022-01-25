var express = require('express');
var router = express.Router();
const { auth ,checkValidator} = require('../middleware/auth');
const {addComplaintValidator} =require('../middleware/validator')
const {addComplaint}=require('../controllers/complaint')

/* GET home page. */
router.post('/add',auth,addComplaintValidator,checkValidator,addComplaint);



module.exports = router;