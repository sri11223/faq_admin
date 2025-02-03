import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AdminPage from './pages/adminpage';
import UserPage from './pages/userpage';
import NavbarEle from './components/navbar';
const App = () => {
  return (
    <Router>
     <NavbarEle/>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/" element={<UserPage />} />
      </Routes>
    </Router>
  );
};

export default App;