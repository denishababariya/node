// user.js

const mongoose = require('mongoose');

var user = new mongoose.Schema({

    name: {
        type: String
    },
    email: {
        type: String    
    },
    password: {
        type: String
    }

});

module.exports = mongoose.model('user', user);


