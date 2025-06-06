const mongoose = require('mongoose');
const Event = require('./models/Event'); // Assurez-vous que le chemin est correct

mongoose.connect('mongodb://localhost:27017/movetan')
  .then(() => {
    console.log('MongoDB connected');
    insertEvents();
  })
  .catch(err => console.log(err));

async function insertEvents() {
  const events = [
    {
      organiserId: new mongoose.Types.ObjectId(), // Remplacez par un ID d'organisateur valide
      type: 'Concert',
      name: 'Summer Beats Festival',
      visibility: 'public',
      description: 'Join us for the Summer Beats Festival with live music and great vibes!',
      flyerUrls: ['http://example.com/flyer1.jpg'],
      placeName: 'Central Park',
      addressLine1: '123 Main St',
      addressLine2: '',
      zipCode: '10001',
      city: 'New York',
      country: 'USA',
      eventStartDate: new Date('2024-07-05'),
      eventStartTime: '18:00',
      eventEndDate: new Date('2024-07-05'),
      eventEndTime: '23:00',
      timeZone: 'America/New_York',
      capacity: 5000,
      price: 50,
      status: 'active'
    },
    {
      organiserId: new mongoose.Types.ObjectId(), // Remplacez par un ID d'organisateur valide
      type: 'Afterwork',
      name: 'Downtown Afterwork Party',
      visibility: 'public',
      description: 'Relax and network at the Downtown Afterwork Party.',
      flyerUrls: ['http://example.com/flyer2.jpg'],
      placeName: 'Sky Lounge',
      addressLine1: '456 Elm St',
      addressLine2: 'Suite 200',
      zipCode: '90001',
      city: 'Los Angeles',
      country: 'USA',
      eventStartDate: new Date('2024-07-12'),
      eventStartTime: '17:00',
      eventEndDate: new Date('2024-07-12'),
      eventEndTime: '21:00',
      timeZone: 'America/Los_Angeles',
      capacity: 200,
      price: 20,
      status: 'active'
    },
    {
      organiserId: new mongoose.Types.ObjectId(), // Remplacez par un ID d'organisateur valide
      type: 'Festival',
      name: 'Tech Innovators Conference',
      visibility: 'public',
      description: 'A festival for tech enthusiasts and innovators.',
      flyerUrls: ['http://example.com/flyer3.jpg'],
      placeName: 'Convention Center',
      addressLine1: '789 Pine St',
      addressLine2: '',
      zipCode: '94101',
      city: 'San Francisco',
      country: 'USA',
      eventStartDate: new Date('2024-07-20'),
      eventStartTime: '09:00',
      eventEndDate: new Date('2024-07-20'),
      eventEndTime: '17:00',
      timeZone: 'America/Los_Angeles',
      capacity: 1000,
      price: 100,
      status: 'active'
    },
    {
      organiserId: new mongoose.Types.ObjectId(), // Remplacez par un ID d'organisateur valide
      type: 'Match ou exhibition sportive',
      name: 'City Marathon',
      visibility: 'public',
      description: 'Join the annual City Marathon and run for a cause!',
      flyerUrls: ['http://example.com/flyer4.jpg'],
      placeName: 'City Stadium',
      addressLine1: '321 Maple St',
      addressLine2: '',
      zipCode: '60601',
      city: 'Chicago',
      country: 'USA',
      eventStartDate: new Date('2024-07-25'),
      eventStartTime: '08:00',
      eventEndDate: new Date('2024-07-25'),
      eventEndTime: '14:00',
      timeZone: 'America/Chicago',
      capacity: 10000,
      price: 30,
      status: 'active'
    }
  ];

  try {
    await Event.insertMany(events);
    console.log('Events inserted successfully');
  } catch (error) {
    console.error('Error inserting events:', error);
  } finally {
    mongoose.connection.close();
  }
}
