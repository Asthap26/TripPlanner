import mongoose from 'mongoose';

const TravelAgencySchema = new mongoose.Schema({
  agencyName: { type: String },
  driverCount: { type: Number },
  busCount: { type: Number },
  carCount: { type: Number },
  pricePerKm: { type: Number },
  advanceAmount: { type: Number },
  phone: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('TravelAgency', TravelAgencySchema);
