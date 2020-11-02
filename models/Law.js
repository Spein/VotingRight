const mongoose = require ('mongoose')

const LawSchema = mongoose.Schema({
    title: {
        type: String,
        required:true,
    },
    participants: {
        type: Array,
        required:true,
    },
    sanction: {
        type: String,
        required:true,
    },
    text: {
        type: String,
        required:true,
    },
    date: {
        type: String,
        required:true,
    }
})
module.exports = mongoose.model('Laws',LawSchema);