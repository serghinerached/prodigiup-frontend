import React, { useEffect, useState } from 'react';
import bannerImg from './assets/images/banner.jpg'; 
import logoProdigiup from './assets/images/logoProdigiup.png';
import logoDsi from './assets/images/logoDsi.png';

function App() {
  const [message, setMessage] = useState("Connexion au serveur...");
  // 1. Notre interrupteur pour le menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
 //   fetch("http://localhost:8080/api/hello")
      fetch("/api/hello") // provisoire

      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => setMessage("Erreur de connexion"));
  }, []);

  return (
    <div className="App" style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0, position: 'relative', overflowX: 'hidden' }}>
      
      {/* --- 2. MENU LATÉRAL (SIDEBAR) --- */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: isMenuOpen ? '0' : '-250px', // On le cache à droite (-250px)
        width: '200px',
        height: '100%',
        backgroundColor: '#333',
        color: 'white',
        transition: '0.3s ease', // Animation fluide
        zIndex: 2000,
        padding: '20px',
        boxShadow: '-2px 0 10px rgba(0,0,0,0.3)'
      }}>
        {/* BOUTON FERMER */}
        <div onClick={() => setIsMenuOpen(false)} style={{ cursor: 'pointer', textAlign: 'right', fontSize: '24px' }}>✕</div>
        
        {/* LIENS DU MENU */}
        <ul style={{ listStyle: 'none', padding: 0, marginTop: '40px' }}>
          <li style={{ padding: '15px 0', borderBottom: '1px solid #444', cursor: 'pointer' }}>Home</li>
          <li style={{ padding: '15px 0', borderBottom: '1px solid #444', cursor: 'pointer' }}>Tracker</li>
          <li style={{ padding: '15px 0', borderBottom: '1px solid #444', cursor: 'pointer' }}>Guides</li>
          <li style={{ padding: '15px 0', borderBottom: '1px solid #444', cursor: 'pointer' }}>Planning</li>
        </ul>
      </div>

      {/* --- 3. NAVBAR BLANCHE --- */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 30px',
        backgroundColor: 'white',
        height: '100px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <img src={logoProdigiup} alt="Logo Prodigiup" style={{ height: '80px' }} />

        {/* MENU SANDWICH (AU CLIC, ON OUVRE LE MENU) */}
        <div 
          onClick={() => setIsMenuOpen(true)} // <-- COMMANDE POUR OUVRIR
          style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '5px' }}
        >
          <div style={{ width: '25px', height: '3px', backgroundColor: '#333' }}></div>
          <div style={{ width: '25px', height: '3px', backgroundColor: '#333' }}></div>
          <div style={{ width: '25px', height: '3px', backgroundColor: '#333' }}></div>
        </div>
      </nav>

      {/* --- 4. BANNIÈRE PRINCIPALE --- */}
      <header style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${bannerImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '50px', opacity: 0.9 }}>Centre de service DSI - E2EPLM </p>
      </header>

      {/* --- 5. CONTENU --- */}
      <main style={{ padding: '40px', textAlign: 'center' }}>
        <p>Réponse du Backend Java :</p>
        <h2 style={{ color: '#007bff' }}>{message}</h2>
      </main>

    </div>
  );
}

export default App;