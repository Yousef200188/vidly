const express = require('express')
const error = require('../midleware/error')
const generes = require('../route/Gener')
const movies = require('../route/Movies')
const customers = require('../route/Customer')
const rentals = require('../route/Rentals')
const users = require('../route/Users')
const auth = require('../route/models/auth')
const returns = require('../route/returns')
module.exports = function (app) {
    app.use(express.json())
    app.use('/api/users', users)
    app.use('/api/generes', generes)
    app.use('/api/customers', customers)
    app.use('/api/movies', movies)
    app.use('/api/rentals', rentals)
    app.use('/api/auth', auth)
    app.use('/api/returns',returns)
    app.use(error)
}