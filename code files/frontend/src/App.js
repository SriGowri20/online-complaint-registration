import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/common/Home';
import Login from './components/common/Login';
import SignUp from './components/common/SignUp';
import HomePage from './components/user/HomePage';
import Complaint from './components/user/Complaint';
import Status from './components/user/Status';
import AgentHome from './components/agent/AgentHome';
import AdminHome from './components/admin/AdminHome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/login"      element={<Login />} />
        <Route path="/signup"     element={<SignUp />} />
        <Route path="/home"       element={<HomePage />} />
        <Route path="/complaint"  element={<Complaint />} />
        <Route path="/status"     element={<Status />} />
        <Route path="/agent"      element={<AgentHome />} />
        <Route path="/admin"      element={<AdminHome />} />
      </Routes>
    </Router>
  );
}

export default App;

