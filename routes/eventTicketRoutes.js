const express = require('express');
const router = express.Router();
const EventTicket = require('../models/EventTicket');

// Route pour créer un nouvel EventTicket
router.post('/create', async (req, res) => {
    try {
        const eventTicketData = {
            eventId: req.body.eventId,
            ticketId: req.body.ticketId,
            nbTicketsMax: req.body.nbTicketsMax,
            price: req.body.price,
            nbTicketsSold: req.body.nbTicketsSold || 0,
            validityPeriodSet: req.body.validityPeriodSet || false,
            timeZone: req.body.timeZone,
            ticketsEndingDate: req.body.ticketsEndingDate,
            ticketsEndingHour: req.body.ticketsEndingHour,
            ticketsStartDate: req.body.ticketsStartDate,
            ticketsStartHour: req.body.ticketsStartHour,
            discountSet: req.body.discountSet || false,
            discountAmount: req.body.discountAmount,
            discountLevel: req.body.discountLevel || 'percent',
            discountEndDate: req.body.discountEndDate,
            discountEndHour: req.body.discountEndHour
        };

        const newEventTicket = new EventTicket(eventTicketData);
        await newEventTicket.save();

        res.status(201).json({ message: 'EventTicket created successfully', eventTicket: newEventTicket });
    } catch (error) {
        res.status(500).json({ message: 'Error creating EventTicket', error });
    }
});

// Route pour récupérer tous les EventTickets
router.get('/', async (req, res) => {
    try {
        const eventTickets = await EventTicket.find();
        res.status(200).json(eventTickets);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching EventTickets', error });
    }
});

// Route pour supprimer un EventTicket par son ID
router.delete('/:id', async (req, res) => {
    try {
        const eventTicketId = req.params.id;
        await EventTicket.findByIdAndDelete(eventTicketId);
        res.status(200).json({ message: 'EventTicket deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting EventTicket', error });
    }
});

module.exports = router;