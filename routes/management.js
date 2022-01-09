var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',(req, res)=> {
  
  res.json({name:"arun",age:20})
});

router.get('/add/:id',(req, res)=> {
  console.log(req.params)
  res.send("add api called")
});

module.exports = router;
