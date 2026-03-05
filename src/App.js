import React, { useEffect, useState } from 'react';
import bannerImg from './assets/images/banner.jpg'; 
import logoProdigiup from './assets/images/logoProdigiup.png';

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

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', overflowX: 'hidden' }}>

      {/* MENU LATÉRAL GAUCHE */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: isMenuOpen ? '0' : '-250px',
        width: '220px',
        height: '100%',
        backgroundColor: '#333',
        color: 'white',
        transition: '0.3s ease',
        zIndex: 2000,
        padding: '20px',
        boxShadow: '2px 0 10px rgba(0,0,0,0.3)'
      }}>
        <div onClick={() => setIsMenuOpen(false)}
             style={{ cursor: 'pointer', textAlign: 'right', fontSize: '24px' }}>
          ✕
        </div>

        <ul style={{ listStyle: 'none', padding: 0, marginTop: '40px' }}>
          <li style={{ padding: '15px 0', borderBottom: '1px solid #444' }}>Home</li>
          <li style={{ padding: '15px 0', borderBottom: '1px solid #444' }}>Tracker</li>
          <li style={{ padding: '15px 0', borderBottom: '1px solid #444' }}>Guides</li>
          <li style={{ padding: '15px 0', borderBottom: '1px solid #444' }}>Planning</li>
        </ul>
      </div>

      {/* NAVBAR */}
      <nav style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${bannerImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        height: '60px',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        color: 'white'
      }}>

        {/* GAUCHE : burger + logo + titre */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {/* Burger */}
          <div onClick={() => setIsMenuOpen(true)}
               style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <div style={{ width: '25px', height: '3px', backgroundColor: 'white' }}></div>
            <div style={{ width: '25px', height: '3px', backgroundColor: 'white' }}></div>
            <div style={{ width: '25px', height: '3px', backgroundColor: 'white' }}></div>
          </div>

          {/* Logo + titre */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px',marginLeft: '200px' }}>
            <img src={logoProdigiup} alt="Logo" style={{ height: '80px' }} />
            <span style={{ fontSize: '20px' }}>E2EPLM - Service center</span>
          </div>
        </div>

        {/* DROITE : date / heure */}
        <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
          {dateTime}
        </div>

      </nav>

      {/* CONTENU */}
      <main style={{ padding: '40px', textAlign: 'center' }}>
        <p>Réponse du Backend Java :</p>
        <h2 style={{ color: '#007bff' }}>{message}</h2>
      </main>

    </div>
  );
}

export default App;