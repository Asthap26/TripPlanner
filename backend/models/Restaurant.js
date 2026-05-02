import mongoose from 'mongoose';

const RestaurantSchema = new mongoose.Schema({
  businessName: { type: String, required: true },
  ownerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  gstNumber: { type: String },
  city: { type: String, required: true },
  state: { type: String },
  photo: { type: String },
  vegNonveg: { type: String },
  openingTime: { type: String },
  ratings: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, required: true, min: 1, max: 5 }
  }],
  averageRating: { type: Number, default: 0 },
  totalRatings: { type: Number, default: 0 },
  menu: [{
    name: String,
    category: String,
    price: Number,
    status: { type: String, default: 'Available' }
  }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Restaurant', RestaurantSchema);
