import "../styles/Navbar.css";
export default function Navbar() {
  return (  

<nav className="navbar">
  <div className="navbar-container">

    <div className="nav-left">
      <h2 className="logo">VetoCare</h2>
    </div>

    <ul className="nav-center">
      
      <li>Vets</li>
      <li>Doctors</li>
      <li>Labs and Diagnostics</li>
      <li>Surgeries</li>
      <li>Blog</li>
    </ul>

    <div className="nav-right">
      
      <button className="btn-fill">Join as Vet</button>
      <button className="btn-fill">Signup/Login</button>
    </div>

  </div>
</nav>

  )}
