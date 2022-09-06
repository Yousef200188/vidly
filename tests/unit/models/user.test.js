const { User } = require('../../../route/models/user')
const Jwt = require('jsonwebtoken')
const config = require('config')
const { expectCt } = require('helmet')
const mongoose = require('mongoose')


describe('user.generateAuthToken', () => {
    it('should return a valid Jwt', () => {

        const payload = { isAdmin: true, _id: new mongoose.Types.ObjectId() }
        const user = new User(payload)
        const token = user.generateAuthToken()
        const decoded = Jwt.verify(token, config.get('jwtPrivateKey'))
        expect(decoded).toMatchObject(payload)

    })
})