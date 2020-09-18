const express = require('express');
const mongoose = require('mongoose');
const router = express();
const {Customer, validate} = require('../models/customer');

router.get('/', async(req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.get('/:id', async(req, res) => {
    const customers = await Customer.findById(req.params.id);
    res.send(customers);
});

router.post('/', async(req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });

    await customer.save();
    res.send(customer);
});

router.put('/:id', async(req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });

    if (!customer) return res.send(404).send('Customer could not be found');
    res.send(customer);
});

router.delete('/:id', async(req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) return res.send(404).send('Customer could not be found');

    res.send(customer);
});


module.exports = router;