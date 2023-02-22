const mongoose = require('mongoose');

const Category  = new mongoose.Schema({
    name : {
        type : 'String',
        required : true
    }
})

module.exports = {
   Model : mongoose.model('Category',Category),
   Schema : Category
}