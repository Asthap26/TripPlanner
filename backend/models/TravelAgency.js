import mongoose from 'mongoose';

const TravelAgencySchema = new mongoose.Schema({
  businessName: { type: String },
  ownerName: { type: String },
  email: { type: String },
  phone: { type: String },
  gstNumber: { type: String },
  city: { type: String },
  agencyName: { type: String },
  driverCount: { type: Number },
  busCount: { type: Number },
  carCount: { type: Number },
  pricePerKm: { type: Number },
  photo: { type: String },
  advanceAmount: { type: Number },
  drivers: [{
    name: String,
    expertise: String,
    vehicle: String,
    status: { type: String, default: 'FREE' }
  }],
  ratings: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, required: true, min: 1, max: 5 }
  }],
  averageRating: { type: Number, default: 0 },
  totalRatings: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('TravelAgency', TravelAgencySchema);
