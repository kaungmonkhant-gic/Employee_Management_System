import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import App from "./App";
import AdminDashboard from "./components/AdminDashboard";
import Employee from "./components/Employee"; // Employee component
import Attendance from "./components/Attendance"; // Attendance component
import OT from "./components/OT"; // OT component
import Profile from "./components/Profile"; // Profile component
import PayRoll from "./components/PayRoll"; // PayRoll component
import LoginForm from "./components/LoginForm"; // Login component
import EmployeeDashboard from "./components/Employee/EmployeeDashboard";
import Tasks from "./components/Employee/Tasks";
import Salary from "./components/Employee/Salary";
import EmpProfile from "./components/Employee/EmpProfile";
import EmpAttendance from "./components/Employee/EmpAttendance";
import EmpOt from "./components/Employee/EmpOt";
import EmpOtRequest from "./components/Employee/EmpOtRequest";
import EmpOtRecord from "./components/Employee/EmpOtRecord";
import EmpAttendanceList from "./components/Employee/EmpAttendanceList";
import ProtectedRoute from "./components/common/ProtectedRoute";
import AttendanceRecord from "./components/AttendanceRecord";
import ForgotPassword from "./components/common/ForgotPassword";
import Leave from "./components/Leave";
import AddLeave from "./components/AddLeave";
import DailyAttendance from "./components/DailyAttendance";
import ManagerDashboard from "./components/Manager/ManagerDashboard";
import ManagerProfile from "./components/Manager/ManagerProfile";
import OvertimeHistory from "./components/Manager/OvertimeHistory";
import ManagerOtApproval from "./components/Manager/OvertimeRequest";

const root = ReactDOM.createRoot(document.getElementById("root"));

function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem("token"); // Example: Replace with your auth logic
  return isAuthenticated ? children : <Navigate to="/login" />;
}

root.render(
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/"
             element={
               <PrivateRoute>
                 <App/>
               </PrivateRoute>
             }
      />
        <Route
            path="/admin-dashboard"
            element={
                <ProtectedRoute>
                    <AdminDashboard/>
                </ProtectedRoute>
            }
        >
        <Route path="employee" element={<Employee />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="attendance/attendance-record" element={<AttendanceRecord />} />
        <Route path="attendance/daily-attendance" element={<DailyAttendance />} />
        <Route path="leave" element={<Leave />} />
        <Route path="addleave" element={<AddLeave />} />
        <Route path="ot" element={<OT />} />
        <Route path="profile" element={<Profile />} />
        <Route path="payroll" element={<PayRoll />} />
      </Route>

      <Route path="/employee-dashboard/*" element={<EmployeeDashboard />}>
        <Route path="profile" element={<EmpProfile />} />
        <Route path="attendance" element={<EmpAttendance />} />
        <Route path="attendance-list" element={<EmpAttendanceList />} />
        <Route path="overtime" element={<EmpOt />} />
        <Route path="overtime/otrequest" element={<EmpOtRequest />} />
        <Route path="overtime/otrecord" element={<EmpOtRecord />} />
        <Route path="salary" element={<Salary />} />
        <Route path="tasks" element={<Tasks />} />
      </Route>

      <Route path="/manager-dashboard/*" element={<ManagerDashboard />}>
        <Route path="profile" element={<ManagerProfile />} />
        <Route path="overtime-history" element={<OvertimeHistory />} />
        <Route path="manager-ot-approval" element={<ManagerOtApproval />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
