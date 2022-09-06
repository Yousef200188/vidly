const express = require('express')
const router = express.Router()
const { validateRental, Rental } = require('../route/models/rental')
const { Customer } = require('../route/models/customer')
const { Movie } = require('../route/models/movie')
const mongoose = require('mongoose');

const Fawn = require('fawn')
Fawn.init('mongodb://localhost/vidly')
router.get('/', async (req, res) => {
    const rental = await Rental.find().sort({ dateOut: -1 })
    res.send(rental)
})
router.post('/', async (req, res) => {
    const { error } = validateRental(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const customer = await Customer.findById(req.body.customerid)
    if (!customer) return res.status(404).send('The Element Not Found')
    const movie = await Movie.findById(req.body.movieid)
    if (!movie) return res.status(400).send('The Element Not Found')
    let rental = new Rental({
        customer: {
            _id:customer._id,
            name:customer.name,
            phone:customer.phone
        },
        movie: {
            _id:movie.id,
            title:movie.title,
            dailyRentalRate:movie.dailyRentalRate
        }
    })
    try {
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', { _id:movie._id },
                {
                    $inc: { numberInStock:-1 }
                })
            .run();
        res.send(rental)
    } catch (ex) {
        res.status(500).send('Something Faild')
    }
})
module.exports = router