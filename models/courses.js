const mongoose = require('mongoose')

const Course = new mongoose.Schema({
    title : {
        type : 'String',
        required : true
    },
    category : {
        type : mongoose.ObjectId,
        ref : 'Category'
    },
    users : [{
        type : mongoose.ObjectId,
        ref : 'User',
        default : undefined
    }]
})

module.exports = mongoose.model('Course',Course)    