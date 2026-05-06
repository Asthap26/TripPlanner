# YATRAsathi 🌍✈️

YATRAsathi is an intelligent, full-stack, AI-powered travel planning application designed to craft highly optimized, personalized multi-city itineraries in seconds. Combining a premium 3D user interface with robust partner-management portals, it revolutionizes the way users explore and book travel experiences.

## 🌟 Key Features

- **AI-Powered Trip Generation:** Leverages Google's Gemini LLM to automatically generate day-by-day itineraries, complete with dynamic travel times, famous landmarks, and estimated budgets.
- **Smart Partner Discovery & Booking:** Integrated portals for Hotels, Restaurants, Travel Agencies, and Activities. Users can directly book verified partners and apply automatic promotional discounts.
- **Partner Management Dashboards:** Dedicated role-based dashboards allowing businesses to manage their menus, room availability, driver rosters, and bookings in real-time.
- **Premium 3D UI/UX:** A visually stunning, dark-mode-first aesthetic built with React, Tailwind CSS, and Framer Motion, featuring cinematic landing pages and interactive elements.
- **Interactive Maps:** Real-time routing and visualization using Leaflet.
- **Robust Authentication:** Secure JWT-based user and partner registration and login.
- **Resilient Database Architecture:** Uses MongoDB Atlas for production with an automatic fallback to an in-memory MongoDB server (`mongodb-memory-server`) to guarantee a seamless local development experience.

## 🛠️ Technology Stack

**Frontend:**
- React 18 (Vite)
- Tailwind CSS (Styling & Dark Mode)
- Framer Motion (Animations)
- React Router DOM (Navigation)
- React Leaflet (Interactive Maps)

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- Google Generative AI (Gemini) SDK
- JSON Web Tokens (JWT) & bcrypt (Authentication)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- A Google Gemini API Key

### Installation

1. **Clone the repository (or navigate to the project root):**
   ```bash
   cd TripPlanner
   ```

2. **Install all dependencies:**
   The project uses a root `package.json` that relies on `concurrently` to run both the frontend and backend, but you must install dependencies in both folders:
   ```bash
   npm install
   cd backend && npm install
   cd ..
   ```

3. **Set up Environment Variables:**
   Navigate to the `backend/` directory and create a `.env` file with the following variables:
   ```env
   # backend/.env
   PORT=5555
   MONGODB_URI=YOUR_MONGODB_ATLAS_CONNECTION_STRING_HERE # Optional: Will fallback to in-memory MongoDB if empty
   JWT_SECRET=your_super_secret_jwt_key
   GEMINI_API_KEY=your_google_gemini_api_key
   ```

### Running the Application

You can start both the Vite frontend development server and the Node.js backend server simultaneously from the root directory:

```bash
npm run dev:all
```

- The **Frontend** will run on `http://localhost:5173` (or similar Vite port).
- The **Backend** will run on `http://localhost:5555`.

## 📂 Project Structure

```
TripPlanner/
├── backend/                  # Node.js Express Backend
│   ├── models/               # Mongoose schemas (User, Trip, Hotel, Restaurant, etc.)
│   ├── routes/               # Express API routes (Auth, Trips, Partners, Public)
│   ├── server.js             # Main backend entry point
│   └── package.json
├── src/                      # React Frontend
│   ├── components/           # Reusable UI components (InteractiveMap, ProtectedRoute, etc.)
│   ├── pages/                # Application pages (Landing, Dashboard, TripWizard, etc.)
│   ├── App.jsx               # Main React router configuration
│   └── index.css             # Global Tailwind configuration
├── public/                   # Static assets
├── package.json              # Root package config (concurrently scripts)
└── tailwind.config.js        # Tailwind configuration
```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License
This project is proprietary and built for demonstration and educational purposes.
