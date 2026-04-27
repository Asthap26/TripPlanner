import express from 'express';
import axios from 'axios';
import Trip from '../models/Trip.js';
import ActivityOwner from '../models/ActivityOwner.js';

const router = express.Router();

import { GoogleGenerativeAI } from '@google/generative-ai';

router.post('/generate', async (req, res) => {
  try {
    const { destination, state, cityMode, selectedCities, startDate, endDate, travelers, budget, totalBudget, diffDays, interests } = req.body;
    
    console.log(`Generating AI itinerary for ${destination} for ${diffDays} days...`);
    
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

    // Prepare context for AI
    let travelContext = `Destination: ${destination}. Duration: ${daysCount} days. Travelers: ${travelers}. Budget Category: ${budget}. Interests: ${interests ? interests.join(', ') : 'General tourist spots'}. `;
    
    if (cityMode === 'multi-ai') {
      travelContext += `Task: Create an optimal multi-city road trip or hopping itinerary within the state of ${state}. Select 2-4 best cities based on the duration. Include travel time between cities as transport activities. `;
    } else if (cityMode === 'multi-manual' && selectedCities && selectedCities.length > 0) {
      travelContext += `Task: Create a multi-city itinerary visiting these specific cities: ${selectedCities.join(', ')}. Allocate days appropriately and include inter-city travel as transport activities. `;
    } else {
      travelContext += `Task: Create a detailed daily itinerary focused entirely on ${destination}. `;
    }

    const systemPrompt = `You are an expert local Indian travel agent building highly realistic itineraries.
    You must return a JSON response matching exactly this structure:
    {
      "overview": "A catchy 1 sentence overview",
      "days": [
        {
          "day": 1,
          "title": "Short title of day (e.g. Arrival in CityName)",
          "activities": [
            {
              "time": "10:00 AM",
              "title": "Action (e.g. Flight/Train/Drive or Sightseeing)",
              "type": "transport", // one of: transport, hotel, meal, activity
              "description": "Brief engaging description",
              "cost": 500
            }
          ]
        }
      ]
    }
    Rules:
    1. Exactly ${daysCount} days.
    2. Minimum 3 activities per day (include meals, check-ins, travel).
    3. Costs should be in INR (₹) per person.
    4. If multi-city, add realistic transport times (e.g., "Drive from Ahmedabad to Surat (4 hrs)") as a 'transport' type activity.
    5. Mention real famous places, cafes, and spots.
    ONLY output the JSON. Do not use markdown backticks around the json.`;

    let generatedDays = [];
    let overview = `A carefully planned ${daysCount}-day ${budget} trip to ${destination} for ${travelers} people.`;

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        console.log("Calling Gemini API...");
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
        const result = await model.generateContent(`${systemPrompt}\n\nUser Request: ${travelContext}`);
        const responseText = result.response.text().trim().replace(/^```json/i, '').replace(/```$/i, '').trim();
        
        const aiData = JSON.parse(responseText);
        generatedDays = aiData.days;
        overview = aiData.overview || overview;
        console.log("Gemini generation successful!");
      } catch (aiError) {
        console.error("Gemini API Error:", aiError.message);
        console.log("Falling back to basic generation...");
      }
    } else {
      console.log("No GEMINI_API_KEY found, using dynamic fallback generator.");
    }

    // Fallback if AI fails or key is missing
    if (!generatedDays || generatedDays.length === 0) {
      const citiesToVisit = (cityMode === 'multi-manual' && selectedCities) ? selectedCities : 
                            (cityMode === 'multi-ai' ? ['Ahmedabad', 'Surat'] : [destination]);
      
      for (let day = 1; day <= daysCount; day++) {
        const currentCity = citiesToVisit[(day - 1) % citiesToVisit.length];
        const nextCity = citiesToVisit[day % citiesToVisit.length];
        const isTravelDay = day > 1 && currentCity !== citiesToVisit[(day - 2) % citiesToVisit.length];
        
        let title = `Exploring ${currentCity}`;
        if (day === 1) title = `Arrival in ${currentCity}`;
        if (day === daysCount) title = `Departure from ${currentCity}`;
        if (isTravelDay) title = `Travel to ${currentCity}`;

        const acts = [];
        if (isTravelDay) {
          acts.push({ time: "09:00 AM", title: `Travel to ${currentCity}`, type: "transport", description: `Drive or train to ${currentCity}.`, cost: 1000 });
          acts.push({ time: "01:00 PM", title: "Check-in & Lunch", type: "hotel", description: `Settle in at ${currentCity}.`, cost: 500 });
        } else if (day === 1) {
          acts.push({ time: "10:00 AM", title: `Arrive in ${currentCity}`, type: "transport", description: "Reach destination and transfer to hotel.", cost: 800 });
          acts.push({ time: "12:30 PM", title: "Check-in", type: "hotel", description: "Settle into your accommodation.", cost: 0 });
        } else {
          acts.push({ time: "09:00 AM", title: `Morning at ${currentCity} Highlights`, type: "activity", description: "Visit top local attractions.", cost: 400 });
        }

        acts.push({ time: "02:00 PM", title: "Lunch", type: "meal", description: "Try local delicacies.", cost: 600 });
        acts.push({ time: "05:00 PM", title: "Evening Walk", type: "activity", description: "Explore the immediate surroundings.", cost: 0 });
        
        if (day === daysCount) {
           acts.push({ time: "08:00 PM", title: "Departure", type: "transport", description: "Head back home.", cost: 800 });
        } else {
           acts.push({ time: "08:00 PM", title: "Dinner", type: "meal", description: "Relaxing dinner experience.", cost: 800 });
        }

        generatedDays.push({ day, title, activities: acts });
      }
    }

    const itinerary = {
        overview,
        budgetBreakdown,
        days: generatedDays
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
