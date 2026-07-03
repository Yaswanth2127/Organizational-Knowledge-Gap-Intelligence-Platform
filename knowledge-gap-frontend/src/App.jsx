import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AdminLayout from './layouts/AdminLayout';
import SkillAssessment from "./pages/SkillAssessment";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '15px', background: '#333', display: 'flex', gap: '20px' }}>
        <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</Link>
        <Link to="/register" style={{ color: '#fff', textDecoration: 'none' }}>Register</Link>
        <Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none' }}>Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/layouts" element={<AdminLayout/>}></Route>
        <Route path="/assessment" element={<SkillAssessment />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;