const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Ticket = require('../models/Ticket');
const multer = require('multer');
const path = require('path');

const upload = multer({ dest: path.join('public', 'uploads') });

// Page de création d'événements en ligne
router.get('/create_online_event', (req, res) => {
  res.render('create_online_event');
});

// Page de création d'événements physiques
router.get('/create_venue_event', (req, res) => {
  res.render('create_venue_event');
});

// Page d'exploration des événements
router.get('/explore_events', async (req, res) => {
  try {
    const events = await Event.find({ visibility: 'public' }); // Récupérer les événements publics
    res.render('explore_events', { events });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Page d'exploration des événements par date
router.get('/explore_events_by_date', async (req, res) => {
  try {
    const events = await Event.find({ visibility: 'public' }); // Récupérer les événements publics
    res.render('explore_events_by_date', { events });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Page détaillée pour un événement physique
router.get('/venue_event_detail_view/:id', async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);
    if (event) {
      res.render('venue_event_detail_view', { event });
    } else {
      res.status(404).send('Event not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Page détaillée pour un événement en ligne
router.get('/online_event_detail_view/:id', async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);
    if (event) {
      res.render('online_event_detail_view', { event });
    } else {
      res.status(404).send('Event not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Routes pour le tableau de bord de l'organisateur
router.get('/my_organisation_dashboard', async (req, res) => {
  try {
    const events = await Event.find(); // Récupérer tous les événements
    res.render('my_organisation_dashboard', { events, activePage: 'dashboard' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/organiser_profile_view', (req, res) => {
  res.render('organiser_profile_view', { activePage: 'organiser_profile' });
});

router.get('/my_organisation_dashboard_about', (req, res) => {
  res.render('my_organisation_dashboard_about', { activePage: 'about' });
});

router.get('/my_organisation_dashboard_contact_lists', (req, res) => {
  res.render('my_organisation_dashboard_contact_lists', { activePage: 'contact_lists' });
});

router.get('/my_organisation_dashboard_conversion_setup', (req, res) => {
  res.render('my_organisation_dashboard_conversion_setup', { activePage: 'conversion_setup' });
});

router.get('/my_organisation_dashboard_events', async (req, res) => {
  try {
    const events = await Event.find(); // Récupérer tous les événements
    res.render('my_organisation_dashboard_events', { events, activePage: 'events' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/my_organisation_dashboard_my_team', (req, res) => {
  res.render('my_organisation_dashboard_my_team', { activePage: 'my_team' });
});

router.get('/my_organisation_dashboard_payout', (req, res) => {
  res.render('my_organisation_dashboard_payout', { activePage: 'payout' });
});

router.get('/my_organisation_dashboard_promotion', (req, res) => {
  res.render('my_organisation_dashboard_promotion', { activePage: 'promotion' });
});

router.get('/my_organisation_dashboard_reports', (req, res) => {
  res.render('my_organisation_dashboard_reports', { activePage: 'reports' });
});

router.get('/my_organisation_dashboard_subscription', (req, res) => {
  res.render('my_organisation_dashboard_subscription', { activePage: 'subscription' });
});


// Route to create a new event  
router.post('/submit_event', upload.array('flyerfile', 3), async (req, res) => {
        console.log('--- Données reçues du formulaire : ---');
        console.log(req.body);
        console.log('--------------------------------------');
    try {
                req.body.organiserId = "65f0b5118b6feec6c5bb8420"; // remplace avec un ObjectId valide de ta base

        // Convert checkbox values ("on" when checked) to booleans
        const bookingStartPeriodSet = req.body.bookingStartPeriodSet === 'on';
        const bookingEndPeriodSet   = req.body.bookingEndPeriodSet === 'on';
        const comInPrice            = req.body.comInPrice === 'on';

        // Map HTML event type codes to labels expected by the schema.
        // If the form submits an array (old bug), keep only the first value.
        const typeMap = {
            club: 'Soirée club',
            concert: 'Concert',
            afterwork: 'Afterwork',
            diner: 'Dîner - spectacle',
            afterbeach: 'After beach',
            festival: 'Festival',
            garden: 'Garden - Journée détente',
            spectacle: 'Spectacle',
            excursion: 'Excursion',
            animation: 'Animation en plein air',
            match: 'Match ou exhibition sportive',
            aboutSport: 'Evenement sportif',
            seminaire: 'Séminaire - Convention Interne',
            forum: 'Forum',
            conference: 'Conférence',
            congres: 'Congrès',
            zen: 'Journée bien-être et remise en forme',
            atelier: 'Workshop',
            salon: 'Salon professionnel',
            autres: 'Salon grand public'
        };

        const selectedType = Array.isArray(req.body.type)
            ? req.body.type[0]
            : req.body.type;
        const formattedType = typeMap[selectedType] || selectedType;

        const flyerUrls = req.files ? req.files.map(file => '/uploads/' + file.filename) : [];

        const eventData = {
            organiserId: req.body.organiserId,
            type: formattedType,
            eventName: req.body.eventName,
            visibility: req.body.visibility,
            description: req.body.description,
            flyerUrls,
            placeName: req.body.placeName,  
            addressLine1: req.body.addressLine1,  
            addressLine2: req.body.addressLine2,  
            zipCode: req.body.zipCode,  
            city: req.body.city,  
            country: req.body.country,  
            eventStartDate: req.body.eventStartDate,  
            eventStartTime: req.body.eventStartTime,  
            eventEndDate: req.body.eventEndDate,  
            eventEndTime: req.body.eventEndTime,  
            timeZone: req.body.timeZone,  
            capacity: req.body.capacity,  
            price: req.body.price,
			
            state: 'active',

                        bookingStartPeriodSet: bookingStartPeriodSet,
            bookingStartDate: req.body.bookingStartDate,  
            bookingStartHour: req.body.bookingStartHour,
			
            bookingEndPeriodSet: bookingEndPeriodSet,
            bookingEndingDate: req.body.bookingEndingDate,  
            bookingEndingHour: req.body.bookingEndingHour,
			
                        duration: req.body.duration,
                        comInPrice: comInPrice, // je vien de rajouter ça le 5 novembre
              
            
			// Initialisation des paramètres de remboursement simplifiés
            refundability: 'forbidden', // Valeur par défaut
            refundDelay: null, // Rempli si applicable
            refundPercentage: null // Rempli si applicable
			

			
			
        };  
  
		console.log('Données reçues du formulaire :', req.body);
  
		// Gérer le paramètre refundability en fonction de la saisie du formulaire
		/* voici la logique à avoir : 
		
		Variables : 
		refundabilitySet : boolean
		refundability : string enum
		refundPolicy : string enum
		
		Début : 
		Si la checkbox de name="refundabilitySet" est cochée alors eventData.refundability = forbiden et on ne regarde pas les autres conditions.
		Si la checkbox name="refundabilitySet" n'est pas cochée
		alors : 
			Si la checkbox de name="refund_policy_id" a pour valeur="refund-id-1"
			alors : 
				eventData.refundability="manual"
				eventData.refundDelay = contenu de la variable de naame="refundDelay-manual"
			Sinon si la checkbox de name="refund_policy_id" a pour valeur="refund-id-2"
			alors :
				eventData.refundability="automatic"
				eventData.refundDelay =eventData.refundDelay-auto
				eventData.refundPercentage = valeur du champs de name "refundPercentage"
		
		*/
		 // Logique de gestion des paramètres de remboursement
        if (req.body.refundabilitySet === 'true') {
            // Cas où le remboursement est interdit
            eventData.refundability = 'forbidden';
			eventData.refundDelay = null; // Pas de délai de remboursement
			eventData.refundPercentage = null; // Pas de pourcentage de remboursement
        } else {
            // Remboursement permis, déterminer le type de remboursement et le délai
            if (req.body.refund_policy_id === 'refund-id-1') {
                eventData.refundability = 'manual';
                eventData.refundDelay = req.body['refundDelay-manual'] || null;
            } else if (req.body.refund_policy_id === 'refund-id-2') {
                eventData.refundability = 'automatic';
                eventData.refundDelay = req.body['refundDelay-auto'] || null;
                eventData.refundPercentage = req.body.refundPercentage || null;
            }
        }
		
		// après avoir fait tous les traitements de valeurs et de conditions on doit pouvoir crééer un nouvel event : 
	
        // Create a new event		
        const newEvent = new Event(eventData);
        await newEvent.save();

        // Créer les tickets associés si fournis
        const createdTickets = [];
        if (req.body.tickets) {
            let tickets = [];
            try {
                tickets = JSON.parse(req.body.tickets);
            } catch (e) {
                console.error('Invalid tickets JSON', e);
            }

            for (const ticket of tickets) {
                const ticketData = {
                    eventId: newEvent._id,
                    name: ticket.name,
                    nbTicketsMaxSet: ticket.nbTicketsMaxSet,
                    nbTicketsMax: ticket.nbTicketsMax,
                    nbTicketsMaxByUserSet: ticket.nbTicketsMaxByUserSet,
                    nbTicketsMaxByUser: ticket.nbTicketsMaxByUser,
                    ticketOrder: ticket.ticketOrder,
                    description: ticket.description,
                    price: ticket.price,
                    validityPeriodSet: false,
                    timeZone: newEvent.timeZone || 'UTC',
                    ticketsEndingDate: ticket.ticketsEndingDate,
                    ticketsEndingHour: ticket.ticketsEndingHour,
                    ticketsStartDate: ticket.ticketsStartDate,
                    ticketsStartHour: ticket.ticketsStartHour,
                    ticketDiscountSet: ticket.ticketDiscountSet,
                    ticketDiscountAmount: ticket.ticketDiscountAmount,
                    ticketDiscountLevel: ticket.ticketDiscountLevel,
                    ticketDiscountEndDate: ticket.ticketDiscountEndDate,
                    ticketDiscountEndTime: ticket.ticketDiscountEndTime
                };

                const newTicket = new Ticket(ticketData);
                await newTicket.save();
                createdTickets.push(newTicket);
            }
        }

        res.status(201).json({ message: 'Event created successfully', event: newEvent, tickets: createdTickets });
    } catch (error) {  
        res.status(500).json({ message: 'Error creating event', error });  
    }  
});  

module.exports = router;
