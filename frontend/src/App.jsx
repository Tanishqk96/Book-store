import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom'; // Import 'Route'
import Homepage from './pages/Homepage';
import Createpage from './pages/Createpage';
import Navbar from './components/Navbar';
function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Homepage />} /> {/* Correct 'Route' tag */}
      <Route path="/create" element={<Createpage />} />
    </Routes>
    </>
  );
}

export default App;
