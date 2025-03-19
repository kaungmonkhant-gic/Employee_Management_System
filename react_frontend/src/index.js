import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import App from "./App";
import AdminDashboard from "./components/AdminDashboard";
import Employee from "./components/Employee"; // Employee component
import Attendance from "./components/Attendance"; // Attendance component
import OT from "./components/OT"; // OT component
import Profile from "./components/Profile"; // Profile component
import AdminLeave from "./components/AdminLeave";
import LeaveConfirmedRequest from "./components/LeaveConfirmedRequest";
import AdminLeaveApproval from "./components/AdminLeaveApproval";
// import LeavveConfirmedRequest from "./components/Manager/LeaveConfirmedRequest";
import PayRoll from "./components/PayRoll"; // PayRoll component
import LoginForm from "./components/LoginForm"; // Login component
import EmployeeDashboard from "./components/Employee/EmployeeDashboard";
import Tasks from "./components/Employee/Tasks";
import Salary from "./components/Salary";
import EmpProfile from "./components/Employee/EmpProfile";
import EmpAttendance from "./components/Employee/EmpAttendance";
import EmpLeave from "./components/Employee/EmpLeaveRequest"
import EmpOt from "./components/Employee/EmpOt";
import EmpOtRequest from "./components/Employee/EmpOtRequest";
import EmpOtRecord from "./components/Employee/EmpOtRecord";
import EmpAttendanceList from "./components/Employee/EmpAttendanceList";
import ProtectedRoute from "./components/common/ProtectedRoute";
import AttendanceRecord from "./components/AttendanceRecord";
import ForgotPassword from "./components/common/ForgotPassword";
// import ViewSalary from "./components/Employee/ViewSalary";
import AddLeave from "./components/AddLeave";
import DailyAttendance from "./components/DailyAttendance";
import ManagerDashboard from "./components/Manager/ManagerDashboard";
import ManagerProfile from "./components/Manager/ManagerProfile";
import ManagerOT from "./components/Manager/ManagerOT";
import ManagerOtApproval from "./components/Manager/ManagerOtApproval";
import ConfirmOtRequest from "./components/Manager/ConfirmOtRequest";
import ShowLeave from "./components/ShowLeave";
import ManagerLeave from "./components/Manager/ManagerLeave";
import ManagerLeaveApproval from "./components/Manager/ManagerLeaveApproval";
import LeavveConfirmedRequest from "./components/Manager/LeaveConfirmedRequest";
import ViewEmployee from "./components/Manager/ViewEmployee";
import EmployeeLeaveRecord from "./components/Manager/EmployeeLeaveRecord";
import Leave from "./components/Manager/Leave";
import SelfLeaveRecords from "./components/Employee/SelfLeaveRecords";
import ViewLeaveBalance from "./components/Manager/ShowLeaveBalance";
import SubmitOT from "./components/SubmitOT";
import ShowResignedEmployee from "./components/ShowResignedEmployee";
import SalaryHistory from "./components/Employee/SalaryHistory";
import SalaryHistoryManager from "./components/Manager/SalaryHistoryManager";
import SalaryHistoryAdmin from "./components/SalaryHistoryAdmin";

import Testing from "./components/testing";

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
      {/* <Route path="/"
             element={
               <PrivateRoute>
                 <App/>
               </PrivateRoute>
             }
      /> */}
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
        <Route path="attendance/daily-attendance" element={<DailyAttendance />} />
        <Route path="attendance/attendance-record" element={<AttendanceRecord />} />
        <Route path="show-resigned" element={<ShowResignedEmployee/>} />
        <Route path="showleave" element={<ShowLeave/>} />
        <Route path="salary" element={<Salary />} />
        <Route path="admin-leave" element={<AdminLeave />} />
        <Route path="leave-confirmed" element={<LeaveConfirmedRequest />} />
        <Route path="admin-leave-approval" element={<AdminLeaveApproval/>} />
        <Route path="addleave" element={<AddLeave />} />
        <Route path="ot" element={<OT />} />
        <Route path="submit-ot" element={<SubmitOT />} />
        <Route path="profile" element={<Profile />} />
        <Route path="payroll" element={<PayRoll />} />
        <Route path="salary-history" element={<SalaryHistoryAdmin />} />
        
        <Route path="testing" element={<Testing />} />
      </Route>

      <Route path="/employee-dashboard/*" element={<EmployeeDashboard />}>
        <Route path="profile" element={<EmpProfile />} />
        <Route path="attendance" element={<EmpAttendance />} />
        <Route path="attendance-list" element={<EmpAttendanceList />} />
        <Route path="leave" element={<EmpLeave />}/>
        <Route path="salary-history" element={<SalaryHistory />}/>
        <Route path="self-leave-record" element={<SelfLeaveRecords />} />
        <Route path="overtime" element={<EmpOt />} />
        <Route path="overtime/otrequest" element={<EmpOtRequest />} />
        <Route path="overtime/otrecord" element={<EmpOtRecord />} />
        {/* <Route path="salary" element={<ViewSalary />} /> */}
        <Route path="tasks" element={<Tasks />} />
      </Route>

      <Route path="/manager-dashboard/*" element={<ManagerDashboard />}>
      <Route path="view-employeelist" element={<ViewEmployee />} />
      <Route path="view-leave-balance" element={<ViewLeaveBalance />} />
        <Route path="profile" element={<ManagerProfile />} />
        <Route path="leave" element={<Leave />} />
        <Route path="manager-leave" element={<ManagerLeave />} />
        <Route path="manager-leave-Approval" element={<ManagerLeaveApproval />} />
        <Route path="leave-confirmed" element={<LeavveConfirmedRequest />}/>
        <Route path="employee-leave-record" element={<EmployeeLeaveRecord />} />
        <Route path="manager-ot-self" element={<ManagerOT />} />
        <Route path="manager-ot-approval" element={<ManagerOtApproval />} />
        <Route path="confirm-ot-request" element= {<ConfirmOtRequest />} />
        <Route path="salary-hist" element= {<SalaryHistoryManager />} />
      </Route>
    </Routes>
  </BrowserRouter>
);