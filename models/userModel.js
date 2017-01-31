var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userModel = new Schema({
    userName: {
        type: String
    },
    password: {
        password: String
    },
    loginId: {
        type: String
    },
    userRole: {
        type: String
    },
    userStatus: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    address: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    },
    zipCode:{
        type: String
    }
});

module.exports = mongoose.model('User', userModel);