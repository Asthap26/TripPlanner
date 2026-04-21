import mongoose from 'mongoose';

const HotelSchema = new mongoose.Schema({
  ownerName: { type: String },
  roomPhoto: { type: String },
  pricePerHour: { type: Number },
  rating: { type: Number },
  city: { type: String },
  state: { type: String },
  foodAvailable: { type: Boolean },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Hotel', HotelSchema);
