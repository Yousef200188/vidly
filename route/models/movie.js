const Joi = require('joi')
const mongoose = require('mongoose')
const { generSchema } = require('./gener')
const Movie = mongoose.model('Movie',new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
    },
    gener: {
        type: generSchema,
        required: true,
    },
    numberInStock: {
        type: Number,
        required: true,
        require: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }

}))
async function validateMovie(Movie) {
    const schema = {
        user: Joi.object({
            title: Joi.string().min(0).max(255).required(),
            generId: Joi.objectId().required(),
            numberInStock: Joi.number().min(0).max(255).required(),
            dailyRentalRate: Joi.number().min(0).max(255).required()

        })
    }
    return schema.user.validate(Movie)
}
exports.Movie = Movie
exports.validateMovie = validateMovie