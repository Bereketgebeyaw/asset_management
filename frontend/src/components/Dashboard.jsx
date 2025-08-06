import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [requestingId, setRequestingId] = useState(null);
  const [reason, setReason] = useState({});

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/assets/available');
      setAssets(response.data);
    } catch (err) {
      setError('Failed to fetch available assets');
      console.error('Error fetching assets:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = async (assetId) => {
    setRequestingId(assetId);
    setError('');
    setSuccess('');
    try {
      await axios.post('/assetrequests', {
        assetId,
        reason: reason[assetId] || '',
      });
      setSuccess('Asset request submitted successfully!');
      // Clear the reason after successful submission
      setReason({ ...reason, [assetId]: '' });
      // Refresh assets to update availability
      fetchAssets();
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to request asset. You may already have a pending request for this asset.'
      );
      console.error('Error submitting request:', err);
    } finally {
      setRequestingId(null);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="brand">
            <div className="brand-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
              </svg>
            </div>
            <div className="brand-text">
              <h1>Top Link Technology</h1>
              <p>Asset Management System</p>
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

      {/* Main Content */}
      <main className="dashboard-content">
        <div className="content-card">
          <div className="page-title">
            <h1>Available Assets</h1>
            <p>Browse and request the assets you need for your work</p>
          </div>
          
          {/* Alerts */}
          {error && (
            <div className="alert alert-error">
              <span>✗ {error}</span>
            </div>
          )}
          
          {success && (
            <div className="alert alert-success">
              <span>✓ {success}</span>
            </div>
          )}
          
          {/* Assets Grid */}
          {assets.length === 0 ? (
            <div className="empty-state">
              <p>No assets are currently available for request.</p>
            </div>
          ) : (
            <div className="assets-grid">
              {assets.map((asset) => (
                <div key={asset.id} className="asset-card">
                  {/* Asset Image */}
                  {asset.imageData ? (
                    <img
                      src={`data:${asset.imageContentType};base64,${asset.imageData}`}
                      alt={asset.name}
                      className="asset-image"
                    />
                  ) : (
                    <div className="asset-image">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="#9ca3af">
                        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                    </div>
                  )}
                  
                  <h3 className="asset-title">{asset.name}</h3>
                  
                  <div className="asset-details">
                    <div className="asset-detail">
                      <span className="asset-detail-label">Category:</span>
                      <span className="asset-detail-value">{asset.category}</span>
                    </div>
                    <div className="asset-detail">
                      <span className="asset-detail-label">Serial:</span>
                      <span className="asset-detail-value">{asset.serialNumber}</span>
                    </div>
                    <div className="asset-detail">
                      <span className="asset-detail-label">Status:</span>
                      <span className="asset-detail-value">{asset.status}</span>
                    </div>
                    <div className="asset-detail">
                      <span className="asset-detail-label">Purchase Date:</span>
                      <span className="asset-detail-value">
                        {new Date(asset.purchaseDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  {/* Request Form */}
                  <textarea
                    className="reason-input"
                    placeholder="Reason for request (optional)"
                    value={reason[asset.id] || ''}
                    onChange={(e) => setReason({ ...reason, [asset.id]: e.target.value })}
                  />
                  
                  <button
                    className="request-btn"
                    onClick={() => handleRequest(asset.id)}
                    disabled={requestingId === asset.id}
                  >
                    {requestingId === asset.id ? 'Requesting...' : 'Request Asset'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 