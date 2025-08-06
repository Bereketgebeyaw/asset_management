import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-blue-50">
      <nav className="bg-white shadow-sm">
        <div className="container">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-blue-600">Top Link Technology</div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {user?.email}</span>
              <button onClick={logout} className="btn btn-secondary">Logout</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container py-8">
        <div className="card">
          <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
          <p className="text-gray-600 mb-4">
            Welcome to Top Link Technology Asset Management System.
          </p>
          <p className="text-gray-600">
            This dashboard will show available assets and allow you to make requests.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 