
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/home';
import Projects from './pages/blueprints';
import Blueprint from './pages/blueprint';
import Scan from './pages/scan';
import Gallery from './pages/gallery';
import GalleryPost from './pages/gallery-post';
import Auth from './pages/auth';
import Profile from './pages/profile';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blueprints" element={<Projects />} />
          <Route path="/blueprint/:id" element={<Blueprint />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:id" element={<GalleryPost />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

