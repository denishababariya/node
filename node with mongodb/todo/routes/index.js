// index.js
var express = require('express');
var router = express.Router();
var user = require('../controller/userconroller')
router.post('/register',user.addadmin);
router.post('/adminlogin',user.adminlogin);
router.get('/adminlogout',user.adminlogout);
router.post('/admindelete/:id',user.admindelete);

router.post('/addtask',user.addtask);
router.get('/viewtask',user.viewtask);
router.post('/deletetask/:id',user.taskdelete);
router.post('/updatetask/:id',user.taskupdate);
router.get('/managetask/:id',user.getonetask);

router.post('/registeruser',user.insertuser);
router.get('/viewuser',user.viewuser);
router.get('/deleteuser/:id',user.userdelete);
router.post('/updateuser/:id',user.userupdate);
router.post('/userlogin',user.userlogin);
router.post('/userlogout',user.userlogout)
router.post('/getoneuser/:id',user.getoneuser)

module.exports = router;
