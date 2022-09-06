const Jwt = require('jsonwebtoken')
const config =require('config')
const mongoose = require('mongoose')
const Joi = require('joi')
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        
        type: String,
        require: true,
        minlength: 5,
        maxlength: 1024,
        unique: true
    },
    isAdmin:Boolean
})
userSchema.methods.generateAuthToken = function(){
    const token = Jwt.sign({_id:this._id,isAdmin:this.isAdmin},config.get('jwtPrivateKey'))
    return token

}
const User = mongoose.model('User', userSchema)


function valiadationUser(user) {
    const schema = {
        user: Joi.object({
            name: Joi.string().min(5).max(50).required(),
            email: Joi.string().min(5).max(50).required().email().required(),
            password: Joi.string().min(5).max(1024).required(),
        })
    }
    return schema.user.validate(user)
}
exports.User = User;
exports.valiadationUser = valiadationUser;