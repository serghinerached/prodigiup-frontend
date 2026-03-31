import React from "react";
import bannerImg from "../assets/images/banner.jpg";
import logoProdigiup from "../assets/images/logoProdigiup.png";

function Navbar({ dateTime, setIsMenuOpen }) {

  return (

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

      {/* GAUCHE */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>

        {/* BURGER */}
        <div
          onClick={() => setIsMenuOpen(true)}
          style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '5px' }}
        >
          <div style={{ width: '25px', height: '3px', backgroundColor: 'white' }}></div>
          <div style={{ width: '25px', height: '3px', backgroundColor: 'white' }}></div>
          <div style={{ width: '25px', height: '3px', backgroundColor: 'white' }}></div>
        </div>

        {/* LOGO + TITRE */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '180px' }}>
          <img src={logoProdigiup} alt="Logo" style={{ height: '80px' }} />
          <span style={{ fontSize: '20px' }}>E2EPLM - Service center</span>
        </div>

      </div>

      {/* DROITE : DATE HEURE */}
      <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
        {dateTime}
      </div>

    </nav>

  );

}

export default Navbar;