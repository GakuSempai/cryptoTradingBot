const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const staticRoutes = require('./routes/staticRoutes');
const ticketRoutes = require('./routes/ticketRoutes');  
const eventTicketRoutes = require('./routes/eventTicketRoutes');  

const User = require('./models/User');
const Event = require('./models/Event');

const app = express();

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/movetan')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Définir EJS comme moteur de templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Définir le dossier public pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Middleware pour analyser les corps de requêtes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Gérer les sessions
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Utiliser les routes définies dans les fichiers séparés
app.use('/', staticRoutes);
app.use('/', userRoutes);
app.use('/', eventRoutes);
app.use('/', ticketRoutes);
app.use('/', eventTicketRoutes);
// Route pour la page d'accueil
app.get('/', async (req, res) => {
  try {
    const events = await Event.find({ visibility: 'public' }); // Récupérer les événements publics
    res.render('index', { events });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route dynamique pour les profils utilisateurs
app.get('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (user) {
      res.render('user', { user });
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Démarrer le serveur
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
