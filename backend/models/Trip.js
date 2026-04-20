import mongoose from 'mongoose';

const TripSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  destination: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  travelers: { type: Number, required: true },
  budget: { type: String, required: true },
  interests: [{ type: String }],
  itinerary: { type: Object, required: true }, // The AI-generated plan
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Trip', TripSchema);
