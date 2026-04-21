import mongoose from 'mongoose';

const VehicleSchema = new mongoose.Schema({
  agencyId: { type: mongoose.Schema.Types.ObjectId, ref: 'TravelAgency' },
  driverName: { type: String },
  driverPhone: { type: String },
  type: { type: String }, // Bus / Car
  acType: { type: String }, // AC / Non-AC
  rating: { type: Number },
  availability: { type: Boolean },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Vehicle', VehicleSchema);
