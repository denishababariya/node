var mongoose = require('mongoose');
var student = new mongoose.Schema({
    name:{
        type:String,
    },
    roll_no:{
        type:String,
    },
    std_id:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"std"
    },
    password: {
        type: String,
    },
    division_id:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"div"
    }
})

module.exports = mongoose.model('student',student);
