const mongoose = require('mongoose')

const useSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
})

module.exports = mongoose.model('User', useSchema);