import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import ToolLayout from './layouts/ToolLayout';

// Pages
import LandingPage from './pages/LandingPage';
import CommunityPage from './pages/CommunityPage';
import ApiDocs from './pages/ApiDocs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import RefundPolicy from './pages/RefundPolicy';
import GeneratorPage from './pages/GeneratorPage';
// import ContactUs from './pages/ContactUs';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>

        {/* GROUP 1: Public Marketing Pages (With Footer) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/api-docs" element={<ApiDocs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
        </Route>

        {/* GROUP 2: The Focused App Tool (No Footer) */}
        <Route element={<ToolLayout />}>
          <Route path="/gst-invoice-generator" element={<GeneratorPage />} />
        </Route>

      </Routes>
    </Router>
  );
};

// --- CRITICAL: Always export your component ---
export default App;