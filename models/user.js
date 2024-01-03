const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema({
    email :{
        type: String,
        required: [true, 'Please Enter Email'],
        unique: true, // Make the email field unique
        validate: {
            validator: validator.isEmail, // Use validator.isEmail for email validation
            message: 'Invalid email address',
        },
    },
    password: {
        type: String,
        required: [true, 'Please Enter password']
    },
    createdAt: {
        type: Date,
        default: Date.now(),

    },
})
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        this.password = await bcrypt.hash(this.password, 10);
        return next();
    } catch (err) {
        return next(err);
    }
});

userSchema.methods.comparePassword = async function(enterPassword){
    return bcrypt.compare(enterPassword, this.password)
}
module.exports = mongoose.model("user",userSchema)

