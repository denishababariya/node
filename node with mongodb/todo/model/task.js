// task.js
var mongoose =require('mongoose');

var task=new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },taskname:{
        type:String,
    },
    start_date:{
        type:String,
    },
    end_date:{
        type:String,
    },
    total_days:{
        type:String,
    },
    status:{
        type:String,
    }
});
module.exports=mongoose.model('task',task);