import mongoose from 'mongoose';

const TripDetailsSchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' },
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  activityId: { type: mongoose.Schema.Types.ObjectId, ref: 'ActivityOwner' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('TripDetails', TripDetailsSchema);
