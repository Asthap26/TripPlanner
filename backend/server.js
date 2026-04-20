import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';
import tripRoutes from './routes/tripRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Start MongoDB
async function connectDB() {
  try {
    let mongoUri = process.env.MONGODB_URI;
    
    // Fallback to memory server only if no URI provided
    if (!mongoUri || mongoUri.includes('YOUR_MONGODB_ATLAS_CONNECTION_STRING_HERE')) {
      const mongoServer = await MongoMemoryServer.create();
      mongoUri = mongoServer.getUri();
      console.log('Using Local In-Memory MongoDB as fallback.');
    }
    
    await mongoose.connect(mongoUri);
    console.log(`Connected to MongoDB successfully!`);
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);

app.get('/', (req, res) => {
  res.send('YATRAsathi Full-Stack Backend is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
