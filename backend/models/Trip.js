import mongoose from 'mongoose';

const TripSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  state: { type: String },
  city: { type: String },
  days: { type: Number },
  members: { type: Number },
  budget: { type: Number },
  extraActivities: { type: Boolean },
  createdAt: { type: Date, default: Date.now }
});



export default mongoose.model('Trip', TripSchema);