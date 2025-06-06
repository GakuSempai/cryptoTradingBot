const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // Restrictions sur le ticket
  nbTicketsMaxSet: { type: Boolean, required: true, default: false},
  nbTicketsMax: { type: Number }, // Nombre de tickets max possible portant ce Nombre
  
  nbTicketsMaxByUserSet: { type: Boolean, required: true, default: false},
  nbTicketsMaxByUser: { type: Number },
  
  ticketOrder:{ type: Number },// Emplacement du ticket dans la liste de tickets sur la page de l'événement
  description: { type: String, required: true },
  
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', index: true }, // Index sur eventId
  
  price: { type: Number, required: true },
  nbTicketsSold: { type: Number, default: 0 },
  validityPeriodSet: { type: Boolean, required: true, default: false},
  timeZone: { type: String, required: true },
  ticketsEndingDate: { type: Date },
  ticketsEndingHour: { type: String },
  ticketsStartDate: { type: Date, index: true }, // Index sur ticketsStartDate
  ticketsStartHour: { type: String },
  
  ticketDiscountSet: { type: Boolean, required: true, default: false },
  ticketDiscountAmount: { type: Number, required: true },
  ticketDiscountLevel: { type: String, enum: ['%', '€','$', 'FCFA'], required: true, default: '%'},
  ticketDiscountEndDate: { type: Date, index: true }, // Index sur ticketsStartDate
  ticketDiscountEndTime: { type: String }
});

module.exports = mongoose.model('Ticket', ticketSchema);