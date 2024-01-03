const mongoose = require('mongoose')
const validator = require('validator')
const noteSchema = mongoose.Schema({
    note :{
        type: String,
        required: [true, 'Please Enter Note']
    },
    added_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now(),

    },
})
noteSchema.index({ note: 'text' });
module.exports = mongoose.model("notes",noteSchema)