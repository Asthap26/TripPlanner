import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Restaurant from '../models/Restaurant.js';
import TravelAgency from '../models/TravelAgency.js';
import Hotel from '../models/Hotel.js';
import ActivityOwner from '../models/ActivityOwner.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'yatrasathi_super_secret_key_123';

// Configure Multer for local storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Register Partner
router.post('/register-partner', upload.single('photo'), async (req, res) => {
  try {
    const { businessName, businessType, ownerName, city, state, email, phone, gstNumber, password } = req.body;
    const photo = req.file ? `http://localhost:5555/uploads/${req.file.filename}` : '';



    let newPartner;
    const partnerData = {
      businessName,
      ownerName,
      email,
      phone,
      gstNumber,
      city,
      state,
      photo,
      password: await bcrypt.hash(password, 10)
    };

    if (businessType === 'Restaurant') {
      newPartner = new Restaurant(partnerData);
    } else if (businessType === 'Travel Agency') {
      newPartner = new TravelAgency({
        ...partnerData,
        driverCount: req.body.driverCount,
        pricePerKm: req.body.pricePerKm
      });
    } else if (businessType === 'Hotel / Resort') {
      newPartner = new Hotel(partnerData);
    } else if (businessType === 'Travel and Other Activity') {
      newPartner = new ActivityOwner({
        ...partnerData,
        pricePerPerson: req.body.pricePerPerson,
        time: req.body.time,
        duration: req.body.duration,
        details: req.body.details
      });
    } else {
      return res.status(400).json({ error: 'Invalid business type' });
    }

    // Check if user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    await newPartner.save();

    // Create User login for the partner
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name: ownerName,
      email,
      password: hashedPassword,
      role: 'partner',
      partnerType: businessType
    });
    
    await user.save();

    res.status(201).json({ message: 'Partner registered successfully', partner: newPartner });
  } catch (error) {
    console.error("Partner Registration Error:", error.message);
    res.status(500).json({ error: 'Server error during partner registration' });
  }
});

// Register User
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    // Create JWT payload
    const payload = { userId: user._id, name: user.name };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Login User
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Create JWT
    const payload = { userId: user._id, name: user.name };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, partnerType: user.partnerType } });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: 'Server error during login' });
  }
});

export default router;
