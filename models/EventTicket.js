const mongoose = require('mongoose');

const eventTicketSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true, index: true }, // Index sur eventId
  ticketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true, index: true }, // Index sur ticketId
  nbTicketsMax: { type: Number, required: true },
  price: { type: Number, required: true },
  nbTicketsSold: { type: Number, default: 0 },
  validityPeriodSet: { type: Boolean, required: true, default: false},
  timeZone: { type: String, required: true },
  ticketsEndingDate: { type: Date },
  ticketsEndingHour: { type: String },
  ticketsStartDate: { type: Date, index: true }, // Index sur ticketsStartDate
  ticketsStartHour: { type: String },
  discountSet: { type: Boolean, required: true, default: false },
  discountAmount: { type: Number, required: true },
  discountLevel: { type: String, enum: ['percent', 'fixe'], required: true, default: 'percent'},
  discountEndDate: { type: Date, index: true }, // Index sur ticketsStartDate
  discountEndHour: { type: String }

});

module.exports = mongoose.model('EventTicket', eventTicketSchema);
