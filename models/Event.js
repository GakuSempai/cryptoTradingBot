const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  organiserId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organizer', required: true, index: true, default: '12345667'  }, // Index sur organiserId
  type: {
    type: String, 
    enum: ['Soirée club', 'Concert', 'Afterwork', 'Déjeuner-Dansant', 'Dîner - spectacle', 'Garden - Journée détente', 'After beach', 'Festival', 'Spectacle', 'Excursion', 'Animation en plein air', 'Match ou exhibition sportive', 'Evenement sportif', 'Séminaire - Convention Interne', 'Forum', 'Conférence', 'Congrès', 'Journée bien-être et remise en forme', 'Workshop', 'Salon professionnel', 'Salon grand public'], 
    required: true
  },
  eventName: { type: String, maxlength: 300, required: true, index: true }, // Index sur name
  visibility: { type: String, enum: ['public', 'privé'], maxlength: 10, default: 'privé' },
  description: { type: String, maxlength: 20000 },
  flyerUrls: [{ type: String, maxlength: 500 }],
  placeName: { type: String, maxlength: 100, required: true },
  addressLine1: { type: String, maxlength: 250, required: true },
  addressLine2: { type: String, maxlength: 250 },
  zipCode: { type: String, maxlength: 8, required: true },
  city: { type: String, maxlength: 100, required: true, index: true }, // Index sur city
  country: { type: String, maxlength: 100, required: true },
  eventStartDate: { type: Date, required: true, index: true }, // Index sur eventStartDate
  eventStartTime: { type: String, required: true },
  eventEndDate: { type: Date },
  eventEndTime: { type: String },
  timeZone: { type: String, maxlength: 50 },
  capacity: { type: Number },
  state: { type: String, enum: ['active', 'cancelled', 'completed'], default: 'active' },
  createdAt: { type: Date, default: Date.now, index: true }, // Index sur createdAt
  
  // Le booking commence-t-il à une date précise ?
  bookingStartPeriodSet: { type: Boolean, required: true, default: 'false' },
  bookingStartDate: { type: Date, index: true }, // Index sur bookingStartDate
  bookingStartHour: { type: String },
  
  // Le booking se fini-t-il avant la fin de l'évenement ?
  bookingEndPeriodSet: { type: Boolean, required: true, default: 'false' },
  bookingEndingDate: { type: Date },
  bookingEndingHour: { type: String },
  
  // Paiement des frais de transactions inclu dans le prix affiché pour le billet ? Si False, les frais sont ajoutés en supplément à chaque transaction.
  comInPrice: { type: Boolean, required: true },
  duration:{ type: String, enum: ['15', '30', '45', '60', '75', '90', '105', '120', '135', '150', '180', '210', '240', '270', 'more'], required: true, default: '270' },
  
  // Proposer aux clients le remboursement de tickets pour cet évenement ?
  refundabilitySet: { type: Boolean, required: true, default: 'true' },
  refundability: { type: String, enum: ['manual', 'automatic', 'forbidden'], required: true, default: 'forbidden' },
  refundDelay: { type: Number },
  refundPercentage: { type: Number }
  
});

module.exports = mongoose.model('Event', eventSchema);
// Important : Voir annoncer la modif au reste de l'équipe, la modif faite conerne l'ajout de 2 booleens et 4 paramètres commençant par "booking"