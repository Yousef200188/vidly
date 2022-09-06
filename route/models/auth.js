const { app } = require('firebase-functions/v1')
const config = require('config')
const Jwt = require('jsonwebtoken')
const _ = require('lodash')
const { User } = require('../models/user')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const express = require('express')
const { ResultStorage } = require('firebase-functions/v1/testLab')
const { valid } = require('joi')
const router = express.Router()


router.post('/', async (req, res) => {
    const { error } = validateAuth(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(404).res('Invalid Email')

    const match = await bcrypt.compare(req.body.password, user.password)
    if (!match) return res.status(400).send('Invalid Password')
    
    const token =user.generateAuthToken()
    res.send(token)
})
  

function validateAuth(req) {
    const schema = {
        user: Joi.object({
            name: Joi.string().min(5).max(50).required(),
            password: Joi.string().min(5).max(50).required(),
            email: Joi.string().min(5).max(50).required()

        })
    }
    return schema.user.validate(req)
}
module.exports = router
