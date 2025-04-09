import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface HeaderProps {
  isAuthenticated: boolean;
  logout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, logout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* Fixed logout/login button at the very top-right */}
      {isAuthenticated ? (
        <button
          className="logout-btn btn"
          onClick={handleLogout}
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            margin: "1rem",
            zIndex: 1000,
          }}
        >
          Logout
        </button>
      ) : (
        <Link
          to="/login"
          className="btn"
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            margin: "1rem",
            zIndex: 1000,
          }}
        >
          Login
        </Link>
      )}

      {/* Centered title/header */}
      <header className="header" style={{ textAlign: "center", paddingTop: "2rem" }}>
        <h1 style={{ margin: 0 }}>Rockin' Records</h1>
      </header>
    </>
  );
};

export default Header;
