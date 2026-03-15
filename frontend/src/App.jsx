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

        {/* Company dashboard */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

        {/* Add business */}
        <Route path="/add-business" element={<ProtectedRoute><BusinessForm /></ProtectedRoute>} />

        {/* Public review generator */}
        <Route path="/review/:id" element={<ReviewPage />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;