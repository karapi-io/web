import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import ToolLayout from './layouts/ToolLayout';

// Pages
import LandingPage from './pages/LandingPage';
import CommunityPage from './pages/CommunityPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import RefundPolicy from './pages/RefundPolicy';
import GeneratorPage from './pages/GeneratorPage';
import { ApiPlayground } from './components/api-playground/ApiPlayground';
import GetApiKey from './pages/GetKeyPage';
import Templates from './pages/Templates';
import ApiDocs from './pages/ApiDocs';
import ScrollToTop from './components/scrollToTop';
// import ContactUs from './pages/ContactUs';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>

          {/* GROUP 1: Public Marketing Pages (With Footer) */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/playground" element={<ApiPlayground />} />
            <Route path="/api-docs/" element={<ApiDocs />} />
            <Route path="/api-docs/:version/:section" element={<ApiDocs />} />

            <Route path="/templates" element={<Templates />} />
            <Route path="/get-api-key" element={<GetApiKey />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsOfService />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
          </Route>

          {/* GROUP 2: The Focused App Tool (No Footer) */}
          <Route element={<ToolLayout />}>
            <Route path="/gst-invoice-generator" element={<GeneratorPage />} />
          </Route>

        </Routes>
      </Router>
    </>


  );
};

// --- CRITICAL: Always export your component ---
export default App;