var express = require('express');
const { addAnnouncement, editAnnouncement, deleteAnnouncement, getAllAnnouncement, getAnnouncement } = require('../controllers/announcement');
const { isManagement, auth, checkValidator } = require('../middleware/auth');
const { addAnnouncementvalidator, editAnnouncementValidator, deleteValidator } = require('../middleware/validator');
var router = express.Router();

/* GET home page. */
router.post('/add',auth,isManagement,addAnnouncementvalidator,checkValidator,addAnnouncement);

router.post('/edit',auth,isManagement,editAnnouncementValidator,checkValidator,editAnnouncement)

router.post('/delete',auth,isManagement,deleteValidator,checkValidator,deleteAnnouncement)

router.get('/get/all',auth,isManagement,getAllAnnouncement)

router.get('/get',auth,getAnnouncement)


module.exports = router;