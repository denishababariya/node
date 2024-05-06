

const usermodel = require("../model/login");
const std = require("../model/std")
const result = require("../model/result")
const staff = require("../model/staff")
const student = require("../model/student")
const division = require("../model/division");
const bcrypt = require('bcrypt');
const storage = require('node-persist');
storage.init( /* options ... */ );


exports.insert = async (req, res) => {
  var b_pass = await bcrypt.hash(req.body.password, 10);
  req.body.password = b_pass;
  const data = await usermodel.create(req.body);
  
  res.status(200).json({
    data,
    status: "data insert....",
  });

};
exports.std = async (req, res) => {
  const data = await std.create(req.body);
  
  res.status(200).json({
    status: "std insert....",
    data,
  });

};
exports.div = async (req, res) => {
  const data = await division.create(req.body);
  
  res.status(200).json({
    status: "std insert....",
    data,
  });

};
exports.student = async (req, res) => {
  var b_pass = await bcrypt.hash(req.body.password, 10);
  req.body.password = b_pass;
  const data = await student.create(req.body);
  res.status(200).json({
    status: "std insert....",
    data,
  });
};
exports.insertresult = async (req, res) => {
    console.log(req.body.sub1)
    const sub1 = parseInt(req.body.sub1);
    const sub2 = parseInt(req.body.sub2);
    const sub3 = parseInt(req.body.sub3);
    const sub4 = parseInt(req.body.sub4);
    const sub5 = parseInt(req.body.sub5);

    const totalMarks = sub1 + sub2 + sub3 + sub4 + sub5;
    const percentage = (totalMarks / 500) * 100;
    
    const data = await result.create({
        student_id: req.body.student_id,
        sub1: req.body.sub1,
        sub2: req.body.sub2,
        sub3: req.body.sub3,
        sub4: req.body.sub4,
        sub5: req.body.sub5,
        total: totalMarks,
        percentage: percentage
    });
  
  res.status(200).json({
    status: "std insert....",
    data,
  });
};
exports.showresult = async (req,res) =>{
  
    var id = req.params.student_id;
    var data = await result.find({"student_id": id});
    res.status(200).json({
      data
    });
  
};

exports.top5Results = async (req, res) => {
  
    const topResults = await result.find().sort({ percentage: -1 }).limit(5);
    res.status(200).json({
      data: topResults,
      status: "Top 5 results retrieved successfully",
    });
  
};


exports.updateresult = async (req,res) => {
  var admin_id = await storage.getItem('login_staff');
  console.log(admin_id);
  if(admin_id) {
    var id = req.params.id;
    var data = await result.findByIdAndUpdate(id, req.body);
    res.status(200).json({
      data,
      status: "data-updated....",
    });
  }else{
    res.status(200).json({
    
      status: "data error....",
    });
  }
};

exports.deleteresult = async (req,res) => {
  var admin_id = await storage.getItem('login_staff');
  console.log(admin_id);
  if(admin_id) {
    var id = req.params.id;
  var data = await result.findByIdAndDelete(id, req.body);
  res.status(200).json({
    data,
    status: "data-deleted....",
  });
  }else{
    res.status(200).json({
    
      status: "data error....",
    });
  }
};

exports.getstud = async (req, res) => {

  const data = await student.find().populate('std_id').populate({
    path: 'division_id',
    populate: [{ path: 'staff_id' }, { path: 'std_id' }]
  });
  res.status(200).json({
    data,
      
    status: "show data....",
  });
};

exports.updatestudent = async (req,res) => {
  var admin_id = await storage.getItem('login_staff');
  console.log(admin_id);
  if(admin_id) {
    var id = req.params.id;
    var data = await student.findByIdAndUpdate(id, req.body);
    res.status(200).json({
      data,
      status: "data-updated....",
    });
  }else{
    res.status(200).json({
    
      status: "data error....",
    });
  }
}

exports.deletestudent = async (req,res) => {
  var admin_id = await storage.getItem('login_staff');
  console.log(admin_id);
  if(admin_id) {
    var id = req.params.id;
  var data = await student.findByIdAndDelete(id, req.body);
  res.status(200).json({
    data,
    status: "data-deleted....",
  });
  }else{
    res.status(200).json({
    
      status: "data error....",
    });
  }
}


exports.getdata = async (req, res) => {
  const data = await usermodel.find();
  
  res.status(200).json({
    data,
   
    status: "show data....",
  });
};

exports.adminlogin = async (req,res) => {
  var user_status = await storage.getItem('login_user');
  if (user_status == undefined) {
    var data = await usermodel.find({"name": req.body.name});
    if (data.length == 1) {
      bcrypt.compare(req.body.password, data[0].password, async function (err, result) {
        if (result == true) {
          await storage.setItem('login_user', data[0].id);
          res.status(200).json({
            status: "login success"
          });
        } else {
          res.status(200).json({
            status: "Check Your Password"
          });
        }
      });
    } else {
      res.status(200).json({
        status: "Check Your name "
      });
    }
  } else {
    res.status(200).json({
      status: "User is already login"
    });
  }
}

exports.adminlogout = async (req, res) => {
  await storage.clear('login_user');
  res.status(200).json({
   status: "User is logout"
 });
 };

 exports.studentlogin = async (req,res) => {
  var user_status = await storage.getItem('login_student');
  if (user_status == undefined) {
    var data = await student.find({"name": req.body.name});
    if (data.length == 1) {
      bcrypt.compare(req.body.password, data[0].password, async function (err, result) {
        if (result == true) {
          await storage.setItem('login_student', data[0].id);
          res.status(200).json({
            status: "login success"
          });
        } else {
          res.status(200).json({
            status: "Check Your Password"
          });
        }
      });
    } else {
      res.status(200).json({
        status: "Check Your name "
      });
    }
  } else {
    res.status(200).json({
      status: "student is already login"
    });
  }
}

  exports.studentlogout = async (req, res) => {
    await storage.clear('login_student');
    res.status(200).json({
    status: "student is logout"
  });
   
 };
 


exports.getdata = async (req, res) => {
  const data = await staff.find();
  
  res.status(200).json({
    data,
   
    status: "show data....",
  });
};

exports.insertstaff = async (req,res) => {
  var admin_id = await storage.getItem('login_user');
  console.log(admin_id);
  if(admin_id) {
    var b_pass = await bcrypt.hash(req.body.password, 10);
    req.body.password = b_pass;
    var data = await staff.create(req.body);
    
    res.status(200).json({
      data,
      status: "data insert....",
    });
  }else{
    res.status(200).json({
    
      status: "data error....",
    });
  }
}

exports.updatestaff = async (req,res) => {
  var admin_id = await storage.getItem('login_user');
  console.log(admin_id);
  if(admin_id) {
    var id = req.params.id;
    var data = await staff.findByIdAndUpdate(id, req.body);
    res.status(200).json({
      data,
      status: "data-updated....",
    });
  }else{
    res.status(200).json({
    
      status: "data error....",
    });
  }
}

exports.deletestaff = async (req,res) => {
  var admin_id = await storage.getItem('login_user');
  console.log(admin_id);
  if(admin_id) {
    var id = req.params.id;
  var data = await staff.findByIdAndDelete(id, req.body);
  res.status(200).json({
    data,
    status: "data-deleted....",
  });
  }else{
    res.status(200).json({
    
      status: "data error....",
    });
  }
}

exports.staff_view = async (req,res) => {
  var admin_id = await storage.getItem('login_user');
  console.log(admin_id);
  if(admin_id) {
    var data = await staff.find();
    res.status(200).json({
      data,
      status: "data-updated....",
    });
  }else{
    res.status(200).json({
    
      status: "data error....",
    });
  }
}

exports.stafflogin = async (req,res) => {
  var user_status = await storage.getItem('login_staff');
  if (user_status == undefined) {
    var data = await staff.find({"username": req.body.username});
    if (data.length == 1) {
      bcrypt.compare(req.body.password, data[0].password, async function (err, result) {
        if (result == true) {
          await storage.setItem('login_staff', data[0].id);
          res.status(200).json({
            status: "login success"
          });
        } else {
          res.status(200).json({
            status: "Check Your Password"
          });
        }
      });
    } else {
      res.status(200).json({
        status: "Check Your username "
      });
    }
  } else {
    res.status(200).json({
      status: "User is already login"
    });
  }
}


exports.stafflogout = async (req, res) => {
  await storage.clear('login_staff');
  res.status(200).json({
   status: "User is logout"
 });
   
 };
