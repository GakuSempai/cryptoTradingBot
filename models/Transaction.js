const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  method: { type: String, enum: ['card', 'paypal'], required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true, index: true }, // Index sur date
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true }, // Index sur userId
  transactionEmail: { type: String, required: true }
});

module.exports = mongoose.model('Transaction', transactionSchema);
