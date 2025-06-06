const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// Route pour créer un ticket
router.post('/ticket', async (req, res) => {
  const { name, price, comInPrice } = req.body;
  const ticket = new Ticket({ name, price, comInPrice });
  try {
    await ticket.save();
    res.send('Ticket created successfully');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error creating ticket');
  }
});

// Route pour récupérer tous les tickets
router.get('/tickets', async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.render('ticket_list', { tickets });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error fetching tickets');
  }
});

// Route pour récupérer un ticket par ID
router.get('/ticket/:id', async (req, res) => {
  const ticketId = req.params.id;
  try {
    const ticket = await Ticket.findById(ticketId);
    if (ticket) {
      res.render('ticket_detail', { ticket });
    } else {
      res.status(404).send('Ticket not found');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Error fetching ticket');
  }
});

module.exports = router;
