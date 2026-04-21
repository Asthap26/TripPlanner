import mongoose from 'mongoose';

const ActivityOwnerSchema = new mongoose.Schema({
  activityName: { type: String },
  state: { type: String },
  city: { type: String },
  pricePerPerson: { type: Number },
  time: { type: String },
  details: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('ActivityOwner', ActivityOwnerSchema);
