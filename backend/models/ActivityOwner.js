import mongoose from 'mongoose';

const ActivityOwnerSchema = new mongoose.Schema({
  businessName: { type: String, required: true },
  ownerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  gstNumber: { type: String },
  state: { type: String },
  city: { type: String, required: true },
  pricePerPerson: { type: Number },
  time: { type: String },
  duration: { type: String },
  details: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('ActivityOwner', ActivityOwnerSchema);
