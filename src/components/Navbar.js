import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand brand-glow" to="/">
          <span className="brand-icon">✦</span>
          <span className="brand-text">
            i<span>Notebook</span>
          </span>
        </Link>

        <button
          className="navbar-toggler custom-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav-links">
            <li className="nav-item">
              <Link
                className={`nav-link nav-link-underline ${
                  location.pathname === "/" ? "active-link" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link nav-link-underline ${
                  location.pathname === "/about" ? "active-link" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>

          {!localStorage.getItem("token") ? (
            <div className="d-flex auth-buttons">
              <Link
                className="btn btn-outline-light auth-btn mx-2"
                to="/login"
                role="button"
              >
                Login
              </Link>
              <Link
                className="btn btn-primary auth-btn-filled mx-2"
                to="/signup"
                role="button"
              >
                Signup
              </Link>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="btn btn-outline-light auth-btn logout-btn"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
