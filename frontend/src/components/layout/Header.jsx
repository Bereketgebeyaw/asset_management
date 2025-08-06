import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = ({ title = "Top Link Technology", subtitle = "Asset Management System" }) => {
  const { user, logout } = useAuth();

  return (
    <header className="dashboard-header">
      <div className="header-content">
        <div className="brand">
          <div className="brand-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
            </svg>
          </div>
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