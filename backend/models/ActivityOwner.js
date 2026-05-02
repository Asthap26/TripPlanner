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
  photo: { type: String },
  ratings: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, required: true, min: 1, max: 5 }
  }],
  averageRating: { type: Number, default: 0 },
  totalRatings: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('ActivityOwner', ActivityOwnerSchema);
