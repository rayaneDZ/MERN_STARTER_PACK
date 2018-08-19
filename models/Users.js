const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    firstname : String,
    lastname : String
});

module.exports = mongoose.model('User', usersSchema);