const mongoose = require('mongoose');

const staff_data = new mongoose.Schema({
    name:{
        type:String,
    },
    username:{
        type:String,
    },
    contact_no:{
        type:String,
    },
    password:{
        type:String,
    }
})

module.exports = mongoose.model('staff_data',staff_data);