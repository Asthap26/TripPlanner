import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { MongoMemoryServer } from 'mongodb-memory-server';
import tripRoutes from './routes/tripRoutes.js';
import authRoutes from './routes/authRoutes.js';
import publicRoutes from './routes/publicRoutes.js';
import partnerRoutes from './routes/partnerRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
app.use('/api/public', publicRoutes);
app.use('/api/partner', partnerRoutes);

app.get('/', (req, res) => {
  res.send('YATRAsathi Full-Stack Backend is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
