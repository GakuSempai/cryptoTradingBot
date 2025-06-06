const mongoose = require('mongoose');

const organizerSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true }, // Index sur name
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  zipCode: { type: String, required: true },
  city: { type: String, required: true, index: true }, // Index sur city
  country: { type: String, required: true },
  balance: { type: Number, default: 0 },
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true, index: true } // Index sur businessId
});

module.exports = mongoose.model('Organizer', organizerSchema);
