const { validationCu, Customer } = require('../route/models/customer')
const express = require('express')
const router = express.Router()
router.get('/', async (req, res) => {
    const customer = await Customer.find().sort({ name: 1 })
    res.send(customer)
})
router.post('/', async (req, res) => {
    const result = validationCu(req.body)
    if (result.error) {
        res.status(404).send(result.error.details[0].message)
    }
    let customer = new Customer({
        isGold:req.body.isGold,
         name:req.body.name,
         phone:req.body.phone
     })
    customer = await customer.save()
    res.send(customer)
})
router.put('/:id', async (req, res) => {
    const result = validationCu(req.body)
    if (result.error) {
        res.status(404).send(result.error.details[0].message)
    }
    customer = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
    if (!gener) return res.status(400).send(gener)
    res.send(gener)
})
router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id)
    if (!customer) return res.status(400).send('The customers with The given Id Not Found')
    res.send(customer)

})
router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id)
    if (!customer) return res.status(400).send('The Geners with the given id Not Found')
    res.send(customer)
})
module.exports = router