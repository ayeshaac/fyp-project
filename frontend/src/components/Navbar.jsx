import "../styles/navbar.css";
import { FiChevronDown } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import DropdownVets from "./DropdownVets";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="nav-left">
          <h2 className="logo">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              VetoCare
            </Link>
          </h2>
        </div>

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
            <Link to="/surgery" style={{ textDecoration: "none" }}>
              Surgeries
            </Link>
          </li>

          <li className="nav-link">
            <Link to="/blog" style={{ textDecoration: "none" }}>
              Blog
            </Link>
          </li>
        </ul>

        <div className="nav-right">
          <button className="btn-fill" onClick={() => navigate("/join-vet")}>
            Join as a Vet
          </button>

          <button className="btn-fill">Signup/Login</button>
        </div>
      </div>
    </nav>
  );
}
