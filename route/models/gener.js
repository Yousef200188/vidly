const Jwt =require('jsonwebtoken')
const config = require('config')
const _ = require('lodash')
const mongoose = require('mongoose')
const Joi = require('joi')
const generSchema = new mongoose.Schema({
    
    name: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 50
    },
})
generSchema.methods.generateAuthToken = function(){
    const token = Jwt.sign({_id:this._id},config.get('jwtPrivateKey'))
    return token

}
const Gener = mongoose.model('Gener', generSchema)
function valiadationGener(gener) {
    const schema = {
        user: Joi.object({
            name: Joi.string().min(5).max(50).required(),
          })
    }
    return schema.user.validate(gener)
}
exports.Gener = Gener;
exports.generSchema = generSchema
exports.valiadationGener = valiadationGener;