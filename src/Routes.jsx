import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ContactInquiryForm from './pages/contact-inquiry-form';
import InteractiveCostEstimator from './pages/interactive-cost-estimator';
import ProjectDetailModal from './pages/project-detail-modal';
import HomePortfolioShowcase from './pages/home-portfolio-showcase';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ContactInquiryForm />} />
        <Route path="/contact-inquiry-form" element={<ContactInquiryForm />} />
        <Route path="/interactive-cost-estimator" element={<InteractiveCostEstimator />} />
        <Route path="/project-detail-modal" element={<ProjectDetailModal />} />
        <Route path="/home-portfolio-showcase" element={<HomePortfolioShowcase />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
