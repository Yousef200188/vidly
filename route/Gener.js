const validateObjectId = require('../midleware/validateObjectId')
const auth = require('../midleware/auth')
const admin = require('../midleware/admin')
const _ = require('lodash')
const { valiadationGener, Gener } = require('../route/models/gener')
const express = require('express')
const { default: mongoose } = require('mongoose')
const router = express.Router()
router.get('/', async (req, res) => {

    const gener = await Gener.find().sort({ name: 1 })
    if(!gener)return res.status(404).send('The geners not found')
    res.status(200).send(gener)

})

router.post('/', auth, async (req, res) => {
    const { error } = valiadationGener(req.body)
    if (error) return res.status(401).send(error.details[0].message)

    let gener = new Gener({ name: req.body.name })
    gener = await gener.save()
    const token = gener.generateAuthToken()
    res.header('x-auth-token', token).send(_.pick(gener, ['_id', 'name']))

})
router.put('/:id', async (req, res) => {
    const result = valiadationGener(req.body)
    if (result.error) {
        res.status(404).send(result.error.details[0].message)
    }
    const gener = await findByIdAndUpdat(req.params.id, {
        name: req.body.name, phone: req.body.phone,
        isGold: req.body.isGold
    }, { new: true })
    if (!gener) return res.status(400).send('The Element is Not Found')
    res.send(gener)
})
router.delete('/:id', [auth, admin], async (req, res) => {
    const gener = await Gener.findByIdAndRemove(req.params.id)
    if (!gener) return res.status(400).send('The Element Not Found')
    res.send(gener)
})
router.get('/:id', validateObjectId, async (req, res) => {

    const gener = await Gener.findById(req.params.id)
    if (!gener) return res.status(404).send('The gener not found')
    res.status(200).send(gener)
})
module.exports = router