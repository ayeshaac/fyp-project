import "../styles/navbar.css"; 
import { FiChevronDown } from "react-icons/fi"; 
import { FaUserCircle } from "react-icons/fa"; 
import { Link, useNavigate } from "react-router-dom"; 

import DropdownVets from "./DropdownVets";
import { useEffect, useState } from "react";
export default function Navbar() {
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [role, setRole] = useState(localStorage.getItem("role") || null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    // Update state if localStorage changes
    setToken(storedToken);
    setRole(storedRole);
  }, [localStorage.getItem("token"), localStorage.getItem("role")]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("vet");
    localStorage.removeItem("user");

    setToken(null); // Update the token state
    setRole(null); // Update the role state

    navigate("/"); // Redirect to the homepage or login page
  };

  const goDashboard = () => {
    if (role === "doctor") {
      navigate("/vet-dashboard");
    } else if (role === "user") {
      navigate("/user-dashboard");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* LEFT */}
        <div className="nav-left">
          <h2 className="logo">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              VetoCare
            </Link>
          </h2>
        </div>

        {/* CENTER */}
        <ul className="nav-center">
          <li className="nav-item-with-dropdown">
            <DropdownVets />
          </li>
          <li className="nav-link">
            Hospitals <FiChevronDown className="icon" size={19} />
          </li>
          <li className="nav-link">
            Labs and Diagnostics <FiChevronDown className="icon" size={19} />
          </li>
          <li className="nav-link">
            <Link to="/surgery" style={{ textDecoration: "none", color: "inherit" }}>
              Surgeries
            </Link>
          </li>
          <li className="nav-link">
            <Link to="/blog" style={{ textDecoration: "none", color: "inherit" }}>
              Blog
            </Link>
          </li>
        </ul>

        {/* RIGHT */}
        <div className="nav-right">
          {/* NOT LOGGED IN */}
          {!token && (
            <>
              <button className="btn-fill" onClick={() => navigate("/join-vet")}>
                Join as a Vet
              </button>
              <button className="btn-fill" onClick={() => navigate("/join-user")}>
                Join as User
              </button>
            </>
          )}

          {/* LOGGED IN (Doctor or User) */}
          {token && (
            <>
              {/* Profile Icon */}
              <FaUserCircle
                size={28}
                style={{ cursor: "pointer", marginRight: "15px" }}
                onClick={goDashboard}
              />

              {/* Logout Button */}
              <button className="btn-fill" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}