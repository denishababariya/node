// model.js
var mongoose =require('mongoose');

var admin=new mongoose.Schema({
    username:{
        type:String,
    },
    password:{
        type:String,
    },
});
module.exports=mongoose.model('admin',admin);