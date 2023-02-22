const mongoose = require('mongoose')
const Course = require('./courses');

const User = new mongoose.Schema({
    name : {
        type : 'String',
        required : true
    },
    email : {
        type : 'String',
        required : true
    },
    password : {
        type : 'String',
        required : true
    },
    course : {
        type : [Course.Schema],
        required : true
    }
})

module.exports = {
    Model : mongoose.model('User',User),
    Schema : User
}