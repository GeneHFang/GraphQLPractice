const mongoose = require('mongoose');


const Schema = mongoose.Schema;

//won't need an id
const authorSchema = new Schema({
    name: String,
    age: Number,
});



module.exports = mongoose.model('Author', authorSchema);