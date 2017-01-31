var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var loginModel = new Schema({
    userName: {
        type: String
    },
    password: {
        type: String
    }
});

module.exports = mongoose.model('Login', loginModel);
