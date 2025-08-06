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

  if (loading) {
    return <div className="user-requests-loading">Loading your requests...</div>;
  }

  if (error) {
    return <div className="user-requests-error">{error}</div>;
  }

  return (
    <div className="user-requests">
      <h3>Your Asset Requests</h3>
      {requests.length === 0 ? (
        <div className="no-requests">
          <p>You haven't made any asset requests yet.</p>
        </div>
      ) : (
        <div className="requests-list">
          {requests.map((request) => (
            <div key={request.id} className="request-item">
              <div className="request-header">
                <h4>{request.assetName}</h4>
                <span className={`status-badge ${getStatusColor(request.status)}`}>
                  {request.status}
                </span>
              </div>
              <div className="request-details">
                <div className="request-detail">
                  <span className="label">Request Date:</span>
                  <span className="value">{formatDate(request.requestDate)}</span>
                </div>
                {request.reason && (
                  <div className="request-detail">
                    <span className="label">Reason:</span>
                    <span className="value">{request.reason}</span>
                  </div>
                )}
                {request.adminNotes && (
                  <div className="request-detail">
                    <span className="label">Admin Notes:</span>
                    <span className="value">{request.adminNotes}</span>
                  </div>
                )}
                {request.processedDate && (
                  <div className="request-detail">
                    <span className="label">Processed Date:</span>
                    <span className="value">{formatDate(request.processedDate)}</span>
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