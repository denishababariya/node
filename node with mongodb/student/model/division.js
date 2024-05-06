const mongoose = require('mongoose');

const division = new mongoose.Schema({
    std_id :{
            type : mongoose.Schema.Types.ObjectId,
            ref:"std"
    },
    div:{
        type:String
    },
    staff_id:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"staff_data"
    }
})

module.exports = mongoose.model('div',division);