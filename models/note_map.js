const mongoose = require('mongoose')
const validator = require('validator')
const note_mapSchema = mongoose.Schema({
    note_id :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'notes'
    },
    shared_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    shared_to:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now(),

    },
})

module.exports = mongoose.model("notes_map",note_mapSchema)