import React, { useState } from 'react';

import LandingPage from './components/LandingPage';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// toste r
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import logoImage from '../src/assest/icons/logo.svg'
import { Container } from '@mui/material';

import ChallengeAddEdit from './components/ChallengeAddEdit';
import ChallengeDetails from './components/ChallengeDetails';


const App = () => {


  return (
    // <div>
     
      <Router>
      <div>
      
      <ToastContainer />
      <Container maxWidth="xl" sx={{ mb: 2 }}>
        <div className="logo">
          <img src={logoImage} alt="Logo " />
        </div>
      </Container>
        {/* Routes */}
        <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/create-challenge" element={<ChallengeAddEdit />} />       
        <Route path="/challenge-details" element={<ChallengeDetails />} />       
        {/* <Route path="**"  element={<LandingPage />} />        */}
        </Routes>
      </div>
    </Router>
    
    // </div>
  );
};

export default App;
