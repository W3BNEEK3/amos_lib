const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        reqiured: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('User', userSchema)