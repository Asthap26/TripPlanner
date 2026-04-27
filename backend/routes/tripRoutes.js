import express from 'express';
import axios from 'axios';
import Trip from '../models/Trip.js';
import ActivityOwner from '../models/ActivityOwner.js';

const router = express.Router();

router.post('/generate', async (req, res) => {
  try {
    const { destination, startDate, endDate, travelers, budget, totalBudget, diffDays, interests } = req.body;
    
    console.log(`Generating realistic itinerary for ${destination} for ${diffDays} days...`);
    
    const daysCount = diffDays || 5;
    const finalBudget = totalBudget || 50000;

    // Calculate detailed budget breakdown
    const stays_budget = Math.floor(finalBudget * 0.45);
    const transport_budget = Math.floor(finalBudget * 0.25);
    const food_budget = Math.floor(finalBudget * 0.20);
    const activities_budget = Math.floor(finalBudget * 0.10);
    
    const budgetBreakdown = {
        total: finalBudget,
        stays: stays_budget,
        transport: transport_budget,
        food: food_budget,
        activities: activities_budget
    };
    
    // Fetch registered activities for this destination
    const destName = destination.split(',')[0].trim();
    const dbActivities = await ActivityOwner.find({
      $or: [
        { city: { $regex: new RegExp(destName, 'i') } },
        { state: { $regex: new RegExp(destName, 'i') } }
      ]
    });
    
    const days = [];
    
    for (let day = 1; day <= daysCount; day++) {
        let title, activities;
        if (day === 1) {
            title = "Arrival & Settling In";
            activities = [
                { time: "10:00 AM", title: `Arrive in ${destination}`, type: "transport", description: "Reach destination and transfer to hotel.", cost: Math.floor(transport_budget * 0.2) },
                { time: "12:30 PM", title: "Check-in & Rest", type: "hotel", description: "Settle into your accommodation.", cost: 0 },
                { time: "02:00 PM", title: "Welcome Lunch", type: "meal", description: "Try local delicacies nearby.", cost: Math.floor(food_budget / daysCount * 0.4) },
                { time: "05:00 PM", title: "Evening Walk", type: "activity", description: "Explore the immediate surroundings.", cost: 0 }
            ];
        } else if (day === daysCount) {
            title = "Departure & Souvenirs";
            activities = [
                { time: "09:00 AM", title: "Breakfast & Packing", type: "meal", description: "Final breakfast at the hotel.", cost: Math.floor(food_budget / daysCount * 0.3) },
                { time: "11:00 AM", title: "Souvenir Shopping", type: "activity", description: "Pick up memories to take home.", cost: Math.floor(activities_budget * 0.2) },
                { time: "02:00 PM", title: "Departure", type: "transport", description: "Head back home.", cost: Math.floor(transport_budget * 0.2) }
            ];
        } else {
            title = `Exploring ${destination} - Day ${day}`;
            
            let morningAct = { time: "09:00 AM", title: "Morning Excursion", type: "activity", description: "Visit a top-rated local attraction.", cost: Math.floor(activities_budget / daysCount) };
            if (dbActivities.length > 0) {
               const a = dbActivities[day % dbActivities.length];
               morningAct = { 
                 time: a.time || "09:00 AM", 
                 title: a.businessName || "Featured Activity", 
                 type: "activity", 
                 description: a.details || "A premium local experience from our partners.", 
                 cost: a.pricePerPerson || 0 
               };
            }
            
            activities = [
                morningAct,
                { time: "01:00 PM", title: "Lunch Break", type: "meal", description: "Refuel with some good food.", cost: Math.floor(food_budget / daysCount * 0.4) },
                { time: "03:00 PM", title: "Afternoon Sightseeing", type: "activity", description: "Continue exploring.", cost: Math.floor(activities_budget / daysCount) },
                { time: "07:30 PM", title: "Dinner", type: "meal", description: "Relaxing dinner experience.", cost: Math.floor(food_budget / daysCount * 0.5) }
            ];
        }
            
        days.push({ day, title, activities });
    }

    const itinerary = {
        overview: `A carefully planned ${daysCount}-day ${budget} trip to ${destination} for ${travelers} people.`,
        budgetBreakdown,
        days
    };

    // Save to MongoDB
    const newTrip = new Trip({
      ...req.body,
      itinerary
    });
    await newTrip.save();

    res.status(201).json(newTrip);
  } catch (error) {
    console.error("Error generating trip:", error.message);
    res.status(500).json({ error: 'Failed to generate itinerary.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find().sort({ createdAt: -1 });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trips' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ error: 'Trip not found' });
    res.json(trip);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trip' });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user trips' });
  }
});

router.put('/:id/add-activity', async (req, res) => {
  try {
    const { day, activity } = req.body;
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ error: 'Trip not found' });
    
    const dayObj = trip.itinerary.days.find(d => d.day === parseInt(day));
    if (dayObj) {
      dayObj.activities.push({
        time: activity.time || "TBD",
        title: activity.businessName || "Added Activity",
        type: "activity",
        description: activity.details || (activity.duration ? `Duration: ${activity.duration}` : "Added to itinerary"),
        cost: activity.pricePerPerson || 0
      });
      // Sort activities by time roughly if needed, but append is fine.
      trip.markModified('itinerary.days');
      await trip.save();
    }
    
    res.json(trip);
  } catch (err) {
    console.error("Add activity error:", err);
    res.status(500).json({ error: 'Failed to add activity' });
  }
});

export default router;
