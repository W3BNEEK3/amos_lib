const mongoose = require('mongoose')

const authorSchema = mongoose.Schema({
    name: {
        type: String,
        reqiured: true
    }
})

module.exports = mongoose.model('Authors', authorSchema)