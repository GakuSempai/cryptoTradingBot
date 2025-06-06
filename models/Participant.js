const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  transactionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', required: true, index: true }, // Index sur transactionId
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true, index: true }, // Index sur eventId
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  ticketNumber: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Participant', participantSchema);
