import mongoose from 'mongoose';

const HotelSchema = new mongoose.Schema({
  businessName: { type: String, required: true },
  ownerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  gstNumber: { type: String },
  city: { type: String, required: true },
  state: { type: String },
  photo: { type: String },
  pricePerHour: { type: Number },
  ratings: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, required: true, min: 1, max: 5 }
  }],
  averageRating: { type: Number, default: 0 },
  totalRatings: { type: Number, default: 0 },
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
