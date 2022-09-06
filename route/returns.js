const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)
const validate = require('../midleware/validate')
const express = require('express')
const router = express.Router()
const { Rental } = require('../route/models/rental')
const auth = require('../midleware/auth')
const { Movie } = require('./models/movie')
const { schema } = require('@hapi/joi/lib/compile')




router.post('/', [auth, validate(validateReturn)], async (req, res) => {

    const rental = await Rental.lookup(req.body.customerId, req.body.movieId)
    if (!rental) return res.status(404).send('No found rental')
    if (rental.dateReturned) return res.status(400).send('Rental already processed')
    rental.return()
    await rental.save()
    await Movie.updateOne({ _id: rental.movie._id }, {
        $inc: { numberInStock: 1 }
    })
    return res.send(rental)

})
function validateReturn(req) {
    const schema = {
        user: Joi.object({
            customerId: Joi.objectId(),
            movieId: Joi.objectId()
        })
    }
    return schema.user.validate(req)
}
module.exports = router