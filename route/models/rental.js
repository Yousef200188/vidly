const Joi = require('joi')
const moment = require('moment')
const mongoose = require('mongoose')
const rentalSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            }
        }),
        required: true
    },
    movie: {
        type: mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255,
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    },
    datOut: {
        type: Date,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
})
rentalSchema.statics.lookup = function (customerId, movieId) {
    return this.findOne({
        "customer._id": customerId,
        "movie._id": movieId
    })
}
rentalSchema.methods.return = function(){
    this.dateReturned = new Date()

    const rentalDays = moment().diff(this.datOut, 'days')
    this.rentalFee = rentalDays * this.movie.dailyRentalRate
}
const Rental = mongoose.model('Rental', rentalSchema)
function validateRental(Rentals) {
    schema = {
        user: Joi.object({
            customerid: Joi.ObjectId().required(),
            movieid: Joi.ObjectId().required()


        })
    }
    return schema.user.validate(Rentals)
}
exports.Rental = Rental
exports.validateRental = validateRental