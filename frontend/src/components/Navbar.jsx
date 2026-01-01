import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="brand">
        <Link to="/">TinyFiles</Link>
      </div>
      <div className="nav-links">
        <Link to="/image">Image</Link>
        <Link to="/image-size">Image Size</Link>

        <Link to="/pdf">PDF</Link>
        <Link to="/pdf-compress">Compress PDF</Link>

        {token ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button className="btn-link" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
