import express from 'express';
import Restaurant from '../models/Restaurant.js';
import TravelAgency from '../models/TravelAgency.js';
import Hotel from '../models/Hotel.js';

import User from '../models/User.js';
import Trip from '../models/Trip.js';

const router = express.Router();

router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const tripsPlanned = await Trip.countDocuments();
    const activeDestinations = (await Trip.distinct('destination')).length;
    res.json({ totalUsers, tripsPlanned, activeDestinations });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats', error: error.message });
  }
});

router.get('/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find().sort({ createdAt: -1 });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurants', error: error.message });
  }
});

router.get('/agencies', async (req, res) => {
  try {
    const agencies = await TravelAgency.find().sort({ createdAt: -1 });
    res.json(agencies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching travel agencies', error: error.message });
  }
});



router.get('/hotels', async (req, res) => {
  try {
    const hotels = await Hotel.find().sort({ createdAt: -1 });
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hotels', error: error.message });
  }
});

export default router;
