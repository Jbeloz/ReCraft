
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/home/index';
import Projects from './pages/blueprints/index';
import Blueprint from './pages/blueprint/index';
import Scan from './pages/scan/index';
import Gallery from './pages/gallery/index';
import GalleryPost from './pages/gallery-post/index';
import Auth from './pages/auth/index';
import Profile from './pages/profile/index';

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

