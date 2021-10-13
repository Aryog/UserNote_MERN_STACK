const mongoose = require('mongoose');
const { Schema } = mongoose;
const { body, validationResult } = require("express-validator");


const NotesSchema = new Schema({
    // to save the notes for the particular user mainly it's a foreign key.
    // type: object id of another model
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type:String,
        require: true
    },
    tag:{
        type:String,
        default: 'General'
    },
    description:{
        type:String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('notes',NotesSchema);