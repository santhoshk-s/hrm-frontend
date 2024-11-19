import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./css/style.css";
import "./charts/ChartjsConfig";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

// Import pages
import Dashboard from "./pages/Dashboard";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ShowAttendance from "./pages/admin/ShowAttendance";
import ShowEmployees from "./pages/admin/ShowEmployees";
import InterviewList from "./pages/admin/InterviewList";

import LeaveList from "./pages/admin/LeaveList";
import LeaveForm from "./pages/employee/LeaveForm";
import AddAttendance from "./pages/AddAttendance";
import Profile from "./pages/Profile";
import Employeequery from "./pages/employee/Employeequery";
import Querylist from "./pages/admin/Querylist";
import { Provider } from "react-redux";
import store from "./redux/store"; // Import your Redux store
import AuditLog from "./pages/admin/AuditLog";
import Welcome from "./pages/Welcome";
import { ProtectRoute } from "./partials/ProtectRoute";


function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route element={<ProtectRoute />}>
            <Route path="/" element={<Dashboard />}>
              <Route index element={<Navigate to="/welcome" />} />
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/attendance" element={<ShowAttendance />} />
              <Route path="/showemployees" element={<ShowEmployees />} />
              <Route path="/interviewlist" element={<InterviewList />} />
              <Route path="/leavelist" element={<LeaveList />} />
              <Route path="/leaveform" element={<LeaveForm />} />
              <Route path="/add" element={<AddAttendance />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/employeequery" element={<Employeequery />} />
              <Route path="/querylist" element={<Querylist />} />
              <Route path="/auditlog" element={<AuditLog />} />
            </Route>
          </Route>
        </Routes>
      </Provider>
    </>
  );
}

export default App;
