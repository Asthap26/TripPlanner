import mongoose from 'mongoose';

const HotelSchema = new mongoose.Schema({
  businessName: { type: String, required: true },
  ownerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  gstNumber: { type: String },
  city: { type: String, required: true },
  state: { type: String },
  roomPhoto: { type: String },
  pricePerHour: { type: Number },
  rating: { type: Number },
  foodAvailable: { type: Boolean },
  rooms: [{
    roomType: String,
    price: Number,
    total: Number,
    booked: { type: Number, default: 0 }
  }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Hotel', HotelSchema);
