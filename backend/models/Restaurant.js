import mongoose from 'mongoose';

const RestaurantSchema = new mongoose.Schema({
  businessName: { type: String, required: true },
  ownerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  gstNumber: { type: String },
  city: { type: String, required: true },
  state: { type: String },
  menuPdf: { type: String },
  vegNonveg: { type: String },
  openingTime: { type: String },
  rating: { type: Number },
  menu: [{
    name: String,
    category: String,
    price: Number,
    status: { type: String, default: 'Available' }
  }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Restaurant', RestaurantSchema);
