import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import AdminDashboard from "./components/AdminDashboard";
import Employee from "./components/Employee";  // Employee component
import Attendance from "./components/Attendance";  // Attendance component
import OT from "./components/OT";  // OT component
import Profile from "./components/Profile";  // Profile component
import PayRoll from "./components/PayRoll";  // PayRoll component
import LoginForm from "./components/LoginForm";  // Login component

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="admin-dashboard" element={<AdminDashboard />}>
        <Route path="employee" element={<Employee />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="ot" element={<OT />} />
        <Route path="profile" element={<Profile />} />
        <Route path="payroll" element={<PayRoll />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
