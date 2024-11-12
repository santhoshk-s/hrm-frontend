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


function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Navigate to="/attendance" />} />
          <Route path="/attendance" element={<ShowAttendance />} />
          <Route path="/showemployees" element={<ShowEmployees />} />
          <Route path="/interviewlist" element={<InterviewList/>}/>
          <Route path="/leavelist" element={<LeaveList/>}/>
          <Route path="/leaveform" element={<LeaveForm/>}/>
          <Route path="/addattendance" element={<AddAttendance/>}/>
        
        </Route>
      </Routes>
    </>
  );
}

export default App;
