import { NavLink } from "react-router-dom";
import { useState } from "react";


function Sidebar({ isMenuOpen, setIsMenuOpen }) {

  const [openTracker, setOpenTracker] = useState(false);
  const [openIncidents, setOpenIncidents] = useState(false);


  return (

    <div style={{
      position: 'fixed',
      top: 0,
      left: isMenuOpen ? '0' : '-250px',
      width: '200px',
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


      <li style={{ padding: '15px 0', borderBottom: '1px solid #444', fontSize: 25 }}>

        {/* Titre cliquable */}
        <div
          onClick={() => setOpenTracker(!openTracker)}
          style={{
            color: "white",
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          Tracker
          <span style={{ fontSize: 18 }}>
            {openTracker ? "▼" : "▶"}
          </span>
        </div>

        {/* Sous-menu */}
        {openTracker && (
          <ul style={{ listStyle: "none", paddingLeft: 15, marginTop: 10 }}>

            <li style={{ marginBottom: 5 }}>
              <NavLink
                to="/tracker"
                style={({ isActive }) => ({
                  color: isActive ? "cyan" : "white",
                  textDecoration: "none",
                  fontSize: 20
                })}
              >
                Datas
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/tracker"
                style={({ isActive }) => ({
                  color: isActive ? "cyan" : "white",
                  textDecoration: "none",
                  fontSize: 20
                })}
              >
                Reporting
              </NavLink>
            </li>

          </ul>
        )}

      </li>


      <li style={{ padding: '15px 0', borderBottom: '1px solid #444', fontSize: 25 }}>

        {/* Titre cliquable */}
        <div
          onClick={() => setOpenIncidents(!openIncidents)}
          style={{
            color: "white",
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          Incidents
          <span style={{ fontSize: 18 }}>
            {openIncidents ? "▼" : "▶"}
          </span>
        </div>

        {/* Sous-menu */}
        {openIncidents && (
          <ul style={{ listStyle: "none", paddingLeft: 15, marginTop: 10 }}>

            <li style={{ marginBottom: 5 }}>
              <NavLink
                to="/performance/datas"
                style={({ isActive }) => ({
                  color: isActive ? "cyan" : "white",
                  textDecoration: "none",
                  fontSize: 20
                })}
              >
                Datas
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/performance/graphs"
                style={({ isActive }) => ({
                  color: isActive ? "cyan" : "white",
                  textDecoration: "none",
                  fontSize: 20
                })}
              >
                Graphs
              </NavLink>
            </li>

          </ul>
        )}

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