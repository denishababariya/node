// usercontroller.js 
var user = require('../model/model');
var user1 = require('../model/user')
var task = require('../model/task')
const storage = require('node-persist');
storage.init( /* options ... */);
const bcrypt = require('bcrypt');
exports.addadmin = async (req,res) => {
    var b_pass = await bcrypt.hash(req.body.password, 10);
    req.body.password = b_pass;

    var data = await user.create(req.body);
    res.status(200).json({
        status: "data insert",
        data
    });
}
exports.admindelete = async (req, res) => {
    var id = req.params.id;
    var data = await user.findByIdAndDelete(id, req.body);
    res.status(200).json({
        data
    })
}

exports.adminlogin = async (req,res) => {
    var admin_status = await storage.getItem('admin_login');
    if (admin_status == undefined) {
        var admin_data = await user.find({ "username": req.body.username });

        if (admin_data) {
            bcrypt.compare(req.body.password, admin_data[0].password, async function (err, result) {
                console.log(result);
                if (result == true) {
                    await storage.setItem('admin_login', admin_data[0].id)
                    res.status(200).json({
                        status: "login success"
                    })
                } else {
                    res.status(200).json({
                        status: "cheack your email and password1"
                    })
                }
            });
        } else {
            res.status(200).json({
                status: "cheack your email and password2"
            })
        }
    } else {
        res.status(200).json({
            status: "admin is already login"
        });
    }
}

exports.adminlogout = async (req, res) => {
    await storage.clear();
    res.status(200).json({
        status: "admin logout"
    })
}

exports.addtask = async(req,res)=>{
    var startdate = new Date(req.body.start_date);
    var enddate = new Date(req.body.end_date);
    
    var timeDifference = enddate.getTime() - startdate.getTime();
    
    var totalday = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    const admin_id = await storage.getItem('admin_login');
    if(admin_id){
        var data = await task.create({
            user:req.body.user,
            taskname:req.body.taskname,
            start_date: startdate,
            end_date: enddate,
            total_days: totalday, 
            status : "pandding"
        });
        res.status(200).json({
            status: "data insert",
            data
        });
    } else {
        res.status(200).json({
            status: "only admin can add task"
        });
    }  
}
    
exports.viewtask = async (req, res) => {
    var data = await task.find();
    res.status(200).json({
        data
    })
}
exports.taskupdate = async(req,res)=>{
    var startdate = new Date(req.body.start_date);
    var enddate = new Date(req.body.end_date);
    
    var timeDifference = enddate.getTime() - startdate.getTime();
    
    var totalday = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    var id = req.params.id;
    var data = await task.findByIdAndUpdate(id,{
        taskname:req.body.taskname,
        user:req.body.user,
        start_date: startdate,
        end_date: enddate,
        total_days: totalday, 
        status : "pandding"
    }
    );
    res.status(200).json({
        status:"update user",
        data    
    })
}
exports.taskdelete = async(req,res)=>{
    var id = req.params.id;
    var data = await task.findByIdAndDelete(id , req.body);
    res.status(200).json({
        status:"delete user"
    })
}

exports.getonetask = async (req,res)=>{
    var id = req.params.id;
    var data = await task.findById(id).populate('user');
    res.status(200).json({
        status: "single task view sucessfully",
        data
    })
}
 exports.insertuser = async (req, res) => {
    var b_pass = await bcrypt.hash(req.body.password, 10);
    req.body.password = b_pass;

    var data = await user1.create(req.body);
    res.status(200).json({
        status: "data insert",
        data
    });
};
exports.viewuser = async (req, res) => {
    var data = await user1.find();
    res.status(200).json({
        data
    })
}
exports.userlogin = async (req, res) => {
    var user_status = await storage.getItem('user_login');
    if (user_status == undefined) {
        var user_data = await user1.find({ "name": req.body.name });
        // console.log(admin_data.length);

        if (user_data) {
            bcrypt.compare(req.body.password, user_data[0].password, async function (err, result) {
                console.log(result);
                if (result == true) {
                    await storage.setItem('user_login', user_data[0].id)
                    res.status(200).json({
                        status: "login success"
                    })
                } else {
                    res.status(200).json({
                        status: "cheack your email and password1"
                    })
                }
            });
        } else {
            res.status(200).json({
                status: "cheack your email and password2"
            })
        }
    } else {
        res.status(200).json({
            status: "user is already login"
        });
    }
}

exports.userlogout = async (req, res) => {
    await storage.clear();
    res.status(200).json({
        status: "logout"
    })
}


exports.userupdate = async(req,res)=>{
    var id = req.params.id;
    var data = await user1.findByIdAndUpdate(id,req.body);
    res.status(200).json({
        status:"update user",
        data    
    })
}

exports.userdelete = async(req,res)=>{
    var id = req.params.id;
    var data = await user1.findByIdAndDelete(id , req.body);
    res.status(200).json({
        status:"delete user"
    })
}

exports.getoneuser = async (req,res) => {
    var id = req.params.id;
    var data = await user1.findById(id , req.body);
    res.status(200).json({
        data
    })
}