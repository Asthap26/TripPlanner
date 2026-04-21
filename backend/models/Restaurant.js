import mongoose from 'mongoose';

const RestaurantSchema = new mongoose.Schema({
  ownerName: { type: String },
  menuPdf: { type: String },
  state: { type: String },
  city: { type: String },
  vegNonveg: { type: String },
  phone: { type: String },
  openingTime: { type: String },
  rating: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Restaurant', RestaurantSchema);
