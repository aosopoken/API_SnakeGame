const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
    name: String,
    score: Number,
    approved: Boolean,
})

module.exports = Person