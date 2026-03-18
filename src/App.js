import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import bannerImg from './assets/images/banner.jpg'; 
import logoProdigiup from './assets/images/logoProdigiup.png';

import TrackerComponent from "./components/TrackerComponent";
import PerformanceComponent from "./components/Performance1Component";
import Sidebar from './components/Sidebar';
import Navbar from "./components/Navbar";
/*
import GuideRequestsComponent from "./components/GuideRequestsComponent";
import GuideRequestsMessagesComponent from "./components/GuideRequestsMessagesComponent";
import GuideIncidentsComponent from "./components/GuideIncidentsComponent";
import GuideIncidentsMessageComponent from "./components/GuideIncidentsMessagesComponent";
import GuideRequestVsLicenseKeyComponent from "./components/GuideRequestsVsLicenseKeyComponent";
*/
const backendUrl = process.env.REACT_APP_BACKEND_URL;

function App() {

  const [message, setMessage] = useState("Connexion au serveur...");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dateTime, setDateTime] = useState('');

  // Backend
  useEffect(() => {
    fetch(`${backendUrl}/api/hello`)
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => setMessage("Erreur de connexion"));
  }, []);

  // Date + heure
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formatted =
        `${String(now.getDate()).padStart(2,'0')}/` +
        `${String(now.getMonth()+1).padStart(2,'0')}/` +
        `${now.getFullYear()} ` +
        `${String(now.getHours()).padStart(2,'0')}:` +
        `${String(now.getMinutes()).padStart(2,'0')}`;
      setDateTime(formatted);
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  //*************************************************************** */

  return (

    <Router>

      <div style={{ fontFamily: 'Arial, sans-serif', overflowX: 'hidden' }}>

        {/* MENU LATERAL GAUCHE*/}
        <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        
        {/* NAVBAR */}
        <Navbar dateTime={dateTime} setIsMenuOpen={setIsMenuOpen} />

        {/* CONTENU + ROUTES */}
        <main style={{ padding: '40px', textAlign: 'center' }}>

          <Routes>

            <Route path="/" element={<><h2 style={{ color: '#007bff' }}>{message}</h2></>} />
            <Route path="/tracker" element={<TrackerComponent />} />
            <Route path="/performance" element={<PerformanceComponent />} />


            {/* 
            <Route path="/Guides/AccessRequests" element={<GuideRequestsComponent />} />
            <Route path="/Guides/requestsMessages/:id" element={<GuideRequestsMessagesComponent />} />
            <Route path="/Guides/VsLicenseKey" element={<GuideRequestVsLicenseKeyComponent />} />
            <Route path="/Guides/Incidents" element={<GuideIncidentsComponent />} />
            <Route path="/Guides/incidentsMessages/:id" element={<GuideIncidentsMessageComponent />} />
            */ }

          </Routes>

        </main>

      </div>

    </Router>

  ); // end return

} // end function App

export default App;