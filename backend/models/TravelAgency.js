import mongoose from 'mongoose';

const TravelAgencySchema = new mongoose.Schema({
  businessName: { type: String, required: true },
  ownerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  gstNumber: { type: String },
  city: { type: String },
  agencyName: { type: String },
  driverCount: { type: Number },
  busCount: { type: Number },
  carCount: { type: Number },
  pricePerKm: { type: Number },
  advanceAmount: { type: Number },
  drivers: [{
    name: String,
    expertise: String,
    vehicle: String,
    status: { type: String, default: 'FREE' }
  }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('TravelAgency', TravelAgencySchema);
