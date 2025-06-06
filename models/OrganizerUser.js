const mongoose = require('mongoose');

const organizerUserSchema = new mongoose.Schema({
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organizer', required: true, index: true }, // Index sur organizerId
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true }, // Index sur userId
  role: { type: String, enum: ['member', 'owner'], required: true }
});

module.exports = mongoose.model('OrganizerUser', organizerUserSchema);
