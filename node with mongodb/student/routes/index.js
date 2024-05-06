const express = require('express');
const router = express.Router();
const user= require('../controller/usercontroller');

router.post('/insert',user.insert);
router.get('/view',user.getdata);
router.post('/adminlogin',user.adminlogin);
router.get('/adminlogout',user.adminlogout);
router.post('/staffinsert',user.insertstaff);
router.post('/insertresult',user.insertresult);
router.post('/updateresult/:id',user.updateresult)
router.get('/deleteresult/:id',user.deleteresult)

router.post('/studentlogin',user.studentlogin);
router.get('/studentlogout',user.studentlogout);
router.get('/showresult/:id',user.showresult);
router.get('/s_view',user.staff_view);

router.post('/update/:id',user.updatestaff)
router.get('/delete/:id',user.deletestaff)
router.post('/stafflogin',user.stafflogin);
router.get('/stafflogout',user.stafflogout);
router.post('/updatestudent/:id',user.updatestudent)
router.get('/deletestudent/:id',user.deletestudent)
router.get('/top5results', user.top5Results);
router.post('/std',user.std);
router.post('/div',user.div);
router.post('/student',user.student);
router.get('/viewstudent',user.getstud);


module.exports = router;
