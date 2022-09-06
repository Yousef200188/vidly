const { default: mongoose } = require('mongoose')
const moment = require('moment')
const { disable } = require('../../index')
let server = require('../../index')
const { Gener } = require('../../route/models/gener')
const request = require('supertest')
const { Rental } = require('../../route/models/rental')
const { dotenvConfig } = require('custom-env')
const { User } = require('../../route/models/user')
const express = require('express')
const { Movie } = require('../../route/models/movie')
const { object } = require('joi')
describe('/api/generes', () => {
    let customerId
    let movieId
    let rental
    let token
    let movie
    const exce = async () => {
        return await request(server)
            .post('/api/returns')
            .set('x-auth-token', token)
            .send({ customerId, movieId })
    }
    beforeEach(async () => {
        
        server
        token = new User().generateAuthToken()
        customerId = mongoose.Types.ObjectId()
        movieId = mongoose.Types.ObjectId()
        rental = new Rental({
            customer: {
                _id: customerId,
                name: 'YOUSEF',
                phone: '01064364117'
            },
            movie: {
                _id: movieId,
                title: 'Cairo',
                dailyRentalRate: 2
            }
        })
        await rental.save()
        movie = new Movie({
            _id:movieId,
            title:'112555',
            gener:{name:'12455'},
            dailyRentalRate:2,
            numberInStock:10
        })
       await movie.save()

    })
    afterEach(async()=>{
        await Movie.remove({})

    })
    it('should work!', async () => {
        const result = await Rental.findById(rental._id)
        expect(result).not.toBeNull()
        

    })
    it('should return 401 if user is not logged in', async () => {
        token = ''
        const res = await exce()
        expect(res.status).toBe(401)

    })
    it('should return 400 if customer is not provided', async () => {
        movieId = ''
        const res = await exce()
        expect(res.status).toBe(400)

    })
    it('should return 400 if movie is not provided', async () => {
        customerId = ''
        const res = await exce()
        expect(res.status).toBe(400)


    })
    it('should return 404 if no rental found for the customer/movie', async () => {
        await Rental.remove({})
        const res = await exce()
        expect(res.status).toBe(404)


    })
    it('should return 400 if returns already processed', async () => {
        rental.dateReturned = new Date()
        await rental.save()
        const res = await exce()
        expect(res.status).toBe(400)


    })
    it('should return 200 if we have avalid request', async () => {
        const res = await exce()
        expect(res.status).toBe(200)


    })
    it('should set the returnDate if input is valid', async () => {
        const res = await exce()
        const rentalInDb = await Rental.findById(rental._id)
        const diff = new Date() - rentalInDb.dateReturned
        expect(diff).toBeLessThan(10 * 1000)

    })  
    it('should set the rentalFee if input is valid', async () => {
        rental.datOut = moment().add(-7,'days')
        await rental.save()
        const res = await exce()
        const rentalInDb = await Rental.findById(rental._id)
       expect(rentalInDb.rentalFee).toBe(14)

    })  
    it('should should increase the movie stock if input is valid', async () => {
       
        const res = await exce()
        const movieDb = await Movie.findById(movie._id)
       expect(movieDb.numberInStock).toBe(movie.numberInStock +1)

    }) 
    it('should return the rental if input is valid', async () => {
       
        const res = await exce()
        const rentalDb = await Rental.findById(rental._id)
    //    expect(res.body).toHaveProperty('datOut')
    //    expect(res.body).toHaveProperty('dateReturned')
    //    expect(res.body).toHaveProperty('rentalFee')
    //    expect(res.body).toHaveProperty('movie')
       

       expect(Object.keys(res.body)).toEqual(
        expect.arrayContaining(['datOut','dateReturned','rentalFee','movie'])
       )




    })  
})