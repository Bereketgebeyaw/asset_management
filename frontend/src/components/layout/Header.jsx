import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = ({ title = "Top Link Technology", subtitle = "Asset Management System" }) => {
  const { user, logout } = useAuth();

  return (
    <header className="dashboard-header">
      <div className="header-content">
        <div className="brand">
          <div className="brand-text">
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
        </div>
        <div className="user-section">
          <span className="user-info">Welcome, {user?.email}</span>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 