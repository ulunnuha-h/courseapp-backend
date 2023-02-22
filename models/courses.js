const mongoose = require('mongoose')
const Category = require('./categories');

const Course = new mongoose.Schema({
    title : {
        type : 'String',
        required : true
    },
    category : {
        type : [Category.Schema],
        required : true
    },
})

module.exports = {
    Model : mongoose.model('Course',Course), 
    Schema : Course
};