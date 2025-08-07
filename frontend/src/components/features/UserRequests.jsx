import React, { useState, useEffect } from 'react';
import { assetRequestService } from '../../services/assetRequestService';
import { formatDate } from '../../utils/dateUtils';
import './UserRequests.css';

const UserRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserRequests();
  }, []);

  const fetchUserRequests = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await assetRequestService.getUserRequests();
      setRequests(data);
    } catch (err) {
      setError('Failed to fetch your requests');
      console.error('Error fetching user requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'status-pending';
      case 'approved':
        return 'status-approved';
      case 'rejected':
        return 'status-rejected';
      default:
        return 'status-default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return '⏳';
      case 'approved':
        return '✅';
      case 'rejected':
        return '❌';
      default:
        return '📋';
    }
  };

  const getStatusText = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'Under Review';
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      default:
        return status;
    }
  };

  const getAssetIcon = (assetName) => {
    const name = assetName.toLowerCase();
    if (name.includes('laptop') || name.includes('computer')) return '💻';
    if (name.includes('phone') || name.includes('mobile')) return '📱';
    if (name.includes('monitor') || name.includes('screen')) return '🖥️';
    if (name.includes('tablet')) return '📱';
    if (name.includes('printer')) return '🖨️';
    if (name.includes('scanner')) return '📄';
    return '📦';
  };

  if (loading) {
    return (
      <div className="user-requests-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading your requests...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-requests-container">
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-requests-container">
     

      {requests.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3>No Requests Yet</h3>
          <p>You haven't made any asset requests yet. Start by browsing available assets and making your first request!</p>
        </div>
      ) : (
        <div className="requests-grid">
          {requests.map((request) => (
            <div key={request.id} className="request-card">
              <div className="request-card-header">
                <div className="asset-info">
                  <div className="asset-icon">
                    {getAssetIcon(request.assetName)}
                  </div>
                  <div className="asset-details">
                    <h4 className="asset-name">{request.assetName}</h4>
                    <p className="asset-category">Asset Request</p>
                  </div>
                </div>
                <div className={`status-indicator ${getStatusColor(request.status)}`}>
                  <span className="status-icon">{getStatusIcon(request.status)}</span>
                  <span className="status-text">{getStatusText(request.status)}</span>
                </div>
              </div>
              
              <div className="request-card-body">
                <div className="request-meta">
                  <div className="meta-item">
                    <span className="meta-label">Request Date</span>
                    <span className="meta-value">{formatDate(request.requestDate)}</span>
                  </div>
                  {request.processedDate && (
                    <div className="meta-item">
                      <span className="meta-label">Processed Date</span>
                      <span className="meta-value">{formatDate(request.processedDate)}</span>
                    </div>
                  )}
                  <div className="meta-item">
                    <span className="meta-label">Request ID</span>
                    <span className="meta-value">#{request.id}</span>
                  </div>
                </div>
                
                {request.reason && (
                  <div className="request-reason">
                    <span className="reason-label">Reason</span>
                    <p className="reason-text">{request.reason}</p>
                  </div>
                )}
                
                {request.adminNotes && (
                  <div className="admin-notes">
                    <span className="notes-label">Admin Notes</span>
                    <p className="notes-text">{request.adminNotes}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserRequests; 