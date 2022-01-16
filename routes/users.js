var express = require('express');
var router = express.Router();
const { checkSchema } = require('express-validator');
const {auth,isManagement,checkValidator}= require('../middleware/auth')
const {addUser}= require('../controllers/user')
const {addUserValidator}= require('../middleware/validator')


router.post('/add',auth,isManagement,addUserValidator,checkValidator,addUser);

module.exports = router;
