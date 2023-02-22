const mongoose = require('mongoose')

const Admin = new mongoose.Schema({
    name : {
        type : 'String',
        required : true
    },
    email : {
        type : "String",
        required : true
    },
    password : {
        type : 'String',
        required : true
    }
})

module.exports = {
   Model : mongoose.model('Admin',Admin),
   Schema : Admin
}