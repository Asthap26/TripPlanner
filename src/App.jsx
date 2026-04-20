import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import TripWizardPage from './pages/TripWizardPage';
import ItineraryPage from './pages/ItineraryPage';
import DashboardPage from './pages/DashboardPage';
import DestinationPage from './pages/DestinationPage';
import RestaurantsPage from './pages/RestaurantsPage';
import TransportPage from './pages/TransportPage';
import ReviewPage from './pages/ReviewPage';
import PartnerOnboardingPage from './pages/PartnerOnboardingPage';
import UserProfilePage from './pages/UserProfilePage';
import NotificationsPage from './pages/NotificationsPage';
import BusinessDashboardPage from './pages/BusinessDashboardPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <Router>
      <div className="bg-[#0A0A0A] min-h-screen text-white font-sans selection:bg-[#00FF9D] selection:text-black">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/plan" element={<TripWizardPage />} />
          <Route path="/itinerary" element={<ItineraryPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/destination/:id" element={<DestinationPage />} />
          <Route path="/restaurants" element={<RestaurantsPage />} />
          <Route path="/transport" element={<TransportPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/partner-onboarding" element={<PartnerOnboardingPage />} />
          <Route path="/profile/:username" element={<UserProfilePage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/partner-dashboard" element={<BusinessDashboardPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
