import React, { useState, useContext } from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/elogo.jpg";
import "./Navbar.css";

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="logo" className="logo" />
        <h2 className="brand">Aravind Store</h2>
      </div>

      <div className="navbar-center">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/category/mobile">Mobile</Link></li>
          <li><Link to="/category/men">Men Dress</Link></li>
          <li><Link to="/category/ladies">Ladies Dress</Link></li>
          <li><Link to="/category/kids">Kids</Link></li>
        </ul>
      </div>

      <div className="navbar-right">
        <Link to="/cart" className="cart">
          <FaShoppingCart size={22} />
          <span className="cart-count">{cartItems.length}</span>
        </Link>

        {!token && (
          <>
            <Link to="/register" className="login-btn">Register</Link>
            <Link to="/login" className="login-btn">Login</Link>
          </>
        )}

        {token && (
          <div className="profile-menu">
            <FaUserCircle
              size={30}
              className="profile-icon"
              onClick={() => setOpen(!open)}
            />

            {open && (
              <div className="dropdown">
                <Link to="/admin">Admin Panel</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;