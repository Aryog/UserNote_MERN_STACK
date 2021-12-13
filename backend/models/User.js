const mongoose = require('mongoose');
const { Schema } = mongoose;



const UserSchema = new Schema({
    name:{
        type:String,
        require: true
    },
    email:{
        type:String,
        require: true,
        unique: true
    },
    password:{
        type:String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// creating user as a object id to use it whenever we want to use in our another databases.
const User = mongoose.model('user',UserSchema);

// create indexes method to verify the uniqueness or to implement unique = true
// User.createIndexes();
module.exports = User;