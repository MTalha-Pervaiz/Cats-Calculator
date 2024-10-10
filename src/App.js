import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Calculator from './Calculator';
import HotelsPage from './HotelsPage';
import SavedItinerary from './SavedItinerary';
import ManageServices from './ManageServices';
import DocumentCustomizer from './DocumentCustomizer';
import Layout from './Layout';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? <Layout>{children}</Layout> : <Navigate to="/" replace />;
};

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/calculator" element={<ProtectedRoute><Calculator /></ProtectedRoute>} />
          <Route path="/hotels" element={<ProtectedRoute><HotelsPage /></ProtectedRoute>} />
          <Route path="/saved-itinerary" element={<ProtectedRoute><SavedItinerary /></ProtectedRoute>} />
          <Route path="/services" element={<ProtectedRoute><ManageServices /></ProtectedRoute>} />
          <Route path="/customize-document" element={<ProtectedRoute><DocumentCustomizer /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;