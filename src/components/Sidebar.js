import { NavLink } from "react-router-dom";



function Sidebar({ isMenuOpen, setIsMenuOpen }) {

  return (

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

      <div
        onClick={() => setIsMenuOpen(false)}
        style={{ cursor: 'pointer', textAlign: 'right', fontSize: '24px' }}
      >
        ✕
      </div>

     <ul style={{ listStyle: 'none', padding: 0, marginTop: '40px' }}>

      <li style={{ padding: '15px 0', borderBottom: '1px solid #444',fontSize: 25 }}>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            color: isActive ? "cyan" : "white",
            textDecoration: "none"
          })}
        >
          Home
        </NavLink>
      </li>

      <li style={{ padding: '15px 0', borderBottom: '1px solid #444',fontSize: 25 }}>
        <NavLink
          to="/tracker"
          style={({ isActive }) => ({
            color: isActive ? "cyan" : "white",
            textDecoration: "none"
          })}
        >
          Tracker
        </NavLink>
      </li>

      <li style={{ padding: '15px 0', borderBottom: '1px solid #444',fontSize: 25 }}>
        <NavLink
          to="/Guides/AccessRequests"
          style={({ isActive }) => ({
            color: isActive ? "cyan" : "white",
            textDecoration: "none"
          })}
        >
          Guides
        </NavLink>
      </li>

      </ul>

    </div>

  );

}

export default Sidebar;