const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const knex = require('knex')(require('./knexfile').development);

const app = express();

// Enable CORS
app.use(cors({
    origin: 'http://localhost:3000'  // Adjust this based on your frontend URL
}));

// Body parser middleware to parse JSON requests
app.use(bodyParser.json());

// Testing the database connection
knex.raw('SELECT 1+1 AS result')
    .then(() => {
        console.log('Database connection successful');
    })
    .catch((err) => {
        console.error('Database connection error:', err.message);
    });

// Routes for Services

// GET /api/services - Fetch all services
app.get('/api/services', async (req, res) => {
    try {
        const services = await knex('services').select('*');
        res.status(200).json(services);
    } catch (error) {
        console.error('Failed to fetch services:', error);
        res.status(500).json({ error: 'Failed to fetch services' });
    }
});

// POST /api/services - Create a new service
app.post('/api/services', async (req, res) => {
    const { Services, CAR, VAN, MINIBUS, MIDI_BUS, BUS, F_HT, F_SS, G_HT, G_SS, ABF, LUN, DIN, FEES, MISC, Guid, ExcursionDetails } = req.body;
    
    if (!Services || !CAR || !VAN) {
        return res.status(400).json({ error: 'Missing required fields: Services, CAR, and VAN' });
    }

    const newService = {
        Services,
        CAR,
        VAN,
        MINIBUS,
        MIDI_BUS,
        BUS,
        F_HT,
        F_SS,
        G_HT,
        G_SS,
        ABF,
        LUN,
        DIN,
        FEES,
        MISC,
        Guid,
        ExcursionDetails
    };

    try {
        const [id] = await knex('services').insert(newService);
        const service = await knex('services').where({ id }).first();
        res.status(201).json(service);  // Return the newly created service
    } catch (error) {
        console.error('Failed to create service:', error);
        res.status(500).json({ error: 'Failed to create service' });
    }
});

// Routes for Hotels

// GET /api/hotels - Fetch all hotels
app.get('/api/hotels', async (req, res) => {
    try {
        const hotels = await knex('hotels').select('*');
        res.status(200).json(hotels);
    } catch (error) {
        console.error('Failed to fetch hotels:', error);
        res.status(500).json({ error: 'Failed to fetch hotels' });
    }
});

// POST /api/hotels - Create a new hotel
app.post('/api/hotels', async (req, res) => {
    const { name, location, rating, rooms, amenities, pricePerNight } = req.body;
    
    if (!name || !location || !pricePerNight) {
        return res.status(400).json({ error: 'Missing required fields: name, location, and pricePerNight' });
    }

    const newHotel = {
        name,
        location,
        rating,
        rooms,
        amenities,
        pricePerNight
    };

    try {
        const [id] = await knex('hotels').insert(newHotel);
        const hotel = await knex('hotels').where({ id }).first();
        res.status(201).json(hotel);  // Return the newly created hotel
    } catch (error) {
        console.error('Failed to create hotel:', error);
        res.status(500).json({ error: 'Failed to create hotel' });
    }
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
