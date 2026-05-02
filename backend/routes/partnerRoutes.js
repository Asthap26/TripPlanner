import express from 'express';
import Restaurant from '../models/Restaurant.js';
import TravelAgency from '../models/TravelAgency.js';
import Hotel from '../models/Hotel.js';
import ActivityOwner from '../models/ActivityOwner.js';

const router = express.Router();

// Get the partner's data based on their email
router.get('/me', async (req, res) => {
  try {
    const { email, type } = req.query;
    if (!email || !type) return res.status(400).json({ error: 'Email and type required' });

    let partner;
    if (type === 'Restaurant') {
      partner = await Restaurant.findOne({ email });
    } else if (type === 'Travel Agency') {
      partner = await TravelAgency.findOne({ email });
    } else if (type === 'Hotel / Resort') {
      partner = await Hotel.findOne({ email });
    } else if (type === 'Travel and Other Activity') {
      partner = await ActivityOwner.findOne({ email });
    }

    if (!partner) return res.status(404).json({ error: 'Partner not found' });
    res.json(partner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// RATE PARTNER
router.post('/rate', async (req, res) => {
  try {
    const { type, id, rating, userId } = req.body;
    if (!type || !id || !rating) return res.status(400).json({ error: 'Missing required fields' });

    let partner;
    if (type === 'meal') partner = await Restaurant.findById(id);
    else if (type === 'transport') partner = await TravelAgency.findById(id);
    else if (type === 'hotel') partner = await Hotel.findById(id);
    else if (type === 'activity') partner = await ActivityOwner.findById(id);

    if (!partner) return res.status(404).json({ error: 'Partner not found' });

    // Check if user already rated (optional, but good practice. We'll just allow multiple for now or update existing)
    const existingRatingIndex = partner.ratings.findIndex(r => r.userId && r.userId.toString() === userId);
    if (existingRatingIndex >= 0) {
      partner.ratings[existingRatingIndex].rating = rating;
    } else {
      partner.ratings.push({ userId, rating });
    }

    // Recalculate average
    const total = partner.ratings.reduce((sum, r) => sum + r.rating, 0);
    partner.totalRatings = partner.ratings.length;
    partner.averageRating = total / partner.totalRatings;

    await partner.save();
    res.json(partner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// RESTAURANT ROUTES
router.post('/restaurant/menu', async (req, res) => {
  try {
    const { email, item } = req.body;
    const partner = await Restaurant.findOne({ email });
    if (!partner) return res.status(404).json({ error: 'Not found' });
    
    partner.menu.push(item);
    await partner.save();
    res.json(partner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/restaurant/menu/:id', async (req, res) => {
  try {
    const { email, status } = req.body;
    const partner = await Restaurant.findOne({ email });
    if (!partner) return res.status(404).json({ error: 'Not found' });

    const item = partner.menu.id(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    item.status = status;
    await partner.save();
    res.json(partner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// TRAVEL AGENCY ROUTES
router.post('/agency/driver', async (req, res) => {
  try {
    const { email, driver } = req.body;
    const partner = await TravelAgency.findOne({ email });
    if (!partner) return res.status(404).json({ error: 'Not found' });
    
    partner.drivers.push(driver);
    await partner.save();
    res.json(partner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/agency/driver/:id', async (req, res) => {
  try {
    const { email, status } = req.body;
    const partner = await TravelAgency.findOne({ email });
    if (!partner) return res.status(404).json({ error: 'Not found' });

    const driver = partner.drivers.id(req.params.id);
    if (!driver) return res.status(404).json({ error: 'Driver not found' });

    driver.status = status;
    await partner.save();
    res.json(partner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// HOTEL ROUTES
router.post('/hotel/room', async (req, res) => {
  try {
    const { email, room } = req.body;
    const partner = await Hotel.findOne({ email });
    if (!partner) return res.status(404).json({ error: 'Not found' });
    
    partner.rooms.push(room);
    await partner.save();
    res.json(partner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/hotel/room/:id', async (req, res) => {
  try {
    const { email, action } = req.body; // action: 'increment' or 'decrement'
    const partner = await Hotel.findOne({ email });
    if (!partner) return res.status(404).json({ error: 'Not found' });

    const room = partner.rooms.id(req.params.id);
    if (!room) return res.status(404).json({ error: 'Room not found' });

    if (action === 'increment' && room.booked < room.total) {
      room.booked += 1;
    } else if (action === 'decrement' && room.booked > 0) {
      room.booked -= 1;
    }

    await partner.save();
    res.json(partner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/search', async (req, res) => {
  try {
    const { city, state } = req.query;

    let query = {};
    if (city) {
      const cities = city.split(',').map(c => c.trim());
      query.city = { $in: cities.map(c => new RegExp(`^${c}$`, 'i')) };
    }
    if (state) {
      query.$or = [
        { state: { $regex: new RegExp(`^${state}$`, 'i') } },
        { state: { $exists: false } },
        { state: null }
      ];
    }

    // If both are missing, it might return everything, which could be bad.
    // Ensure at least state is provided
    if (!state && !city) {
      return res.status(400).json({ error: 'Please provide at least a state or city.' });
    }

    const [activities, restaurants, hotels, agencies] = await Promise.all([
      ActivityOwner.find(query),
      Restaurant.find(query),
      Hotel.find(query),
      TravelAgency.find({})
    ]);

    res.json({
      activities,
      restaurants,
      hotels,
      agencies
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
