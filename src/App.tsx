import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import ToolLayout from './layouts/ToolLayout';

// Pages
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
import InvoiceWorkspacePage from './invoice-workflow/pages/InvoiceWorkspacePage';
import InvoiceReviewPage from './invoice-workflow/pages/InvoiceReviewPage';
import NewWorkspacePage from './invoice-workflow/pages/NewWorkspacePage';
import UserProfilePage from './invoice-workflow/pages/UserProfilePage';
import InvoiceProjectsListPage from './invoice-workflow/pages/InvoiceProjectsListPage';
import InvoiceStudioPage from './invoice-workflow/studio/InvoiceStudioPage';
import ProjectHomePage from './invoice-workflow/studio/ProjectHomePage';
import LoginPage from './pages/LoginPage';
import AuthGate from './components/AuthGate';
import WorkspaceLayout from './invoice-workflow/layouts/WorkspaceLayout';
import RootRoute from './components/RootRoute';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>

          <Route path="/" element={<RootRoute />} />

          {/* GROUP 1: Public Marketing Pages (With Footer) */}
          <Route element={<MainLayout />}>
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/playground" element={<ApiPlayground />} />
            <Route path="/api-docs/" element={<ApiDocs />} />
            <Route path="/api-docs/:version/:section" element={<ApiDocs />} />

            <Route path="/templates" element={<Templates />} />
            <Route path="/get-api-key" element={<GetApiKey />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsOfService />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
          </Route>

          {/* GROUP 2: The Focused App Tool (No Footer) */}
          <Route element={<ToolLayout />}>
            <Route path="/gst-invoice-generator" element={<GeneratorPage />} />
          </Route>

          {/* GROUP 3: Authenticated Workspace */}
          <Route element={<AuthGate />}>
            <Route element={<WorkspaceLayout />}>
              {/* User profile routes - hierarchical structure */}
              <Route path="/:username" element={<UserProfilePage />} />
              <Route path="/:username/invoice-projects" element={<InvoiceProjectsListPage />} />
              <Route path="/:username/:projectSlug" element={<ProjectHomePage />} />
              <Route path="/:username/:projectSlug/workspace-demo" element={<InvoiceWorkspacePage />} />
              <Route path="/:username/:projectSlug/review/:reviewId" element={<InvoiceReviewPage />} />
              <Route path="/new-project" element={<NewWorkspacePage />} />
              <Route path="/:username/studio-demo" element={<InvoiceStudioPage />} />
            </Route>
          </Route>

        </Routes>
      </Router>
    </>


  );
};

export default App;