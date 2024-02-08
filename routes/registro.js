const express = require('express');
const router = express.Router();
const connectDB = require('../models/connection');
const Ticket = require('../models/ticketSchema');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.send('Registro');
    res.end();
});

router.post('/:matricula', async (req, res) => {
    await connectDB();

    // const ticket = new Ticket({
    //     matricula: req.params.matricula,
    // });

    // await ticket.save();

    res.set('Content-Type', 'text/html');
    res.send("Registro de matricula: " + req.params.matricula);
    res.end();
});

module.exports = router;