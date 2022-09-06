const { Gener } = require('../route/models/gener')
const { Movie, validateMovie } = require('../route/models/movie')
const express = require('express')
const router = express.Router()
router.get('/', async (req, res) => {
    const movie = await Movie.find().sort({ name: 1 })
    res.send(movie)
})
router.post('/', async (req, res) => {
    const { error } = validateMovie(req.body)
    if (error) return res.status(404).send(error.details[0].message)
    const gener = await Gener.findById(req.body.generid)
    if (!gener) return res.status(400).send('The gener Not Found')
    let movie = new Movie({
        title:req.body.title,
        gener: {
            _id:gener._id,
            name:gener.name
        },
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate
    })
    const result = await movie.save()
    res.send(result)

})
router.put('/:id', async (req, res) => {
    const { error } = validateMovie(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const movie = await Movie.findByIdAndUpdate(req.params.id)
    if (!movie) return res.status(400).send(error.details[0].message)
    res.send(movie)
})
router.delete('/:id', async (req, res) => {
    const movie = await findByIdAndRemove(req.params.id)
    if (!movie) return res.status(400).send('The Movie Not Found')
    res.send(movie)

})
router.get('/:id', async (req, res) => {
    const movie = await findById(req.params.id)
    if (!movie) return res.status(400).send('The Movie Not Found')
    res.send(movie)
})
module.exports = router