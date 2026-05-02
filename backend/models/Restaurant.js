import mongoose from 'mongoose';

const RestaurantSchema = new mongoose.Schema({
  businessName: { type: String },
  ownerName: { type: String },
  email: { type: String },
  phone: { type: String },
  gstNumber: { type: String },
  city: { type: String },
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
