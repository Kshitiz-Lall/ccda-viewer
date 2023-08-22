import React from "react";
import "../css/Navbar.css"; // Make sure to import your CSS file for styling
import logo from "../images/logo1.png";
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="nav-links">
        <button className="about-button">About Us</button>
      </div>
    </nav>
  );
};

export default Navbar;
