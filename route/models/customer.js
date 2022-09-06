const mongoose = require('mongoose')
const Joi = require('joi')
const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    isGold: {
        type: Boolean,
        default: false,
    },
    phone: {
        type: Number,
        minlength: 5,
        maxlength: 50
    }
}));
function validationCu(customer) {
    const schema = {
        user: Joi.object({
            name: Joi.string().min(5).max(50).required(),
            phone: Joi.number().min(5).max(50),
            isGold: Joi.boolean()
        })
    }
    return schema.user.validate(customer)
}
exports.Customer = Customer
exports.validationCu = validationCu
