import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import BusinessForm from "./pages/BusinessForm";
import ReviewPage from "./pages/ReviewPage";
import ProtectedRoute from "./components/ProtectedRoute";
import RevicaAILandingPage from "./Home";
import AuthSuccess from "./pages/AuthSuccess";
import PricingPage from "./pages/Pricing";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import RevicaAIOverview from "./pages/Working";
import Terms from "./pages/Tearms";
import Privacy from "./pages/Privacy";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Company authentication */}
        <Route path="/" element={<RevicaAILandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth/success" element={<AuthSuccess />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/overview" element={<RevicaAIOverview />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />


        {/* Company dashboard */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

        {/* Add business */}
        <Route path="/add-business" element={<ProtectedRoute><BusinessForm /></ProtectedRoute>} />



        {/* Public review generator */}
        <Route path="/review/:id" element={<ProtectedRoute><ReviewPage /></ProtectedRoute>} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;