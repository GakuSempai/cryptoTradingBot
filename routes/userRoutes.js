const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Page d'inscription
router.get('/sign_up', (req, res) => {
  res.render('sign_up');
});

router.post('/signup', async (req, res) => {
  const { firstName, lastName, birthdate, email, phone, password, zipCode, city, country } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    firstName,
    lastName,
    birthdate,
    email,
    phone,
    password: hashedPassword,
    userLevel: 'user',
    zipCode,
    city,
    country
  });
  try {
    await user.save();
    res.redirect('/sign_in');
  } catch (err) {
    console.log(err);
    res.send('Error registering user.');
  }
});

// Page de connexion
router.get('/sign_in', (req, res) => {
  res.render('sign_in');
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.userId = user._id;
    res.redirect('/my_organisation_dashboard');
  } else {
    res.send('Invalid email or password.');
  }
});

module.exports = router;
