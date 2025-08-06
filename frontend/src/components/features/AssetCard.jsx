import React, { useState } from 'react';
import './AssetCard.css';

const AssetCard = ({ asset, onRequest, requestingId, isAssigned = false }) => {
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);

  const handleRequest = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await onRequest(asset.id, reason);
      setReason('');
      setShowRequestForm(false);
    } catch (error) {
      console.error('Error requesting asset:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isRequesting = requestingId === asset.id || isSubmitting;

  // Get category icon and color
  const getCategoryInfo = (category) => {
    switch (category.toLowerCase()) {
      case 'laptop':
        return { icon: '💻', color: '#3b82f6', gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' };
      case 'phone':
        return { icon: '📱', color: '#10b981', gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' };
      case 'monitor':
        return { icon: '🖥️', color: '#8b5cf6', gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' };
      case 'tablet':
        return { icon: '📱', color: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' };
      case 'printer':
        return { icon: '🖨️', color: '#ef4444', gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' };
      case 'scanner':
        return { icon: '📄', color: '#06b6d4', gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)' };
      default:
        return { icon: '📦', color: '#6b7280', gradient: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)' };
    }
  };

  const categoryInfo = getCategoryInfo(asset.category);

  return (
    <div className={`asset-card ${isAssigned ? 'assigned' : ''}`} style={{ '--category-color': categoryInfo.color }}>
      {/* Card Header with Gradient */}
      <div className="card-header" style={{ background: categoryInfo.gradient }}>
        <div className="header-content">
          <div className="category-badge">
            <span className="category-icon">{categoryInfo.icon}</span>
            <span className="category-name">{asset.category}</span>
          </div>
          <div className="status-indicator">
            <span className={`status-dot ${asset.status.toLowerCase()}`}></span>
            <span className="status-text">{isAssigned ? 'Assigned' : asset.status}</span>
          </div>
        </div>
      </div>

      {/* Asset Image Section */}
      <div className="image-section">
        {asset.imageData ? (
          <div className="image-container">
            <img
              src={`data:${asset.imageContentType};base64,${asset.imageData}`}
              alt={asset.name}
              className="asset-image"
            />
            <div className="image-overlay">
              <div className="overlay-content">
                <h3 className="asset-name">{asset.name}</h3>
                <p className="asset-description">
                  {isAssigned ? 'Assigned to you' : 'Click to view details'}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="placeholder-container" style={{ background: categoryInfo.gradient }}>
            <div className="placeholder-content">
              <div className="placeholder-icon">{categoryInfo.icon}</div>
              <h3 className="placeholder-title">{asset.name}</h3>
              <p className="placeholder-subtitle">{asset.category}</p>
            </div>
          </div>
        )}
      </div>

      {/* Asset Details */}
      <div className="details-section">
        <div className="asset-info">
          <h3 className="asset-title">{asset.name}</h3>
          <div className="asset-meta">
            <div className="meta-item">
              <span className="meta-label">Serial Number</span>
              <span className="meta-value">{asset.serialNumber}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Purchase Date</span>
              <span className="meta-value">
                {new Date(asset.purchaseDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Request Section - Only show for available assets */}
        {!isAssigned && (
          <div className="request-section">
            {!showRequestForm ? (
              <button
                className="request-button"
                onClick={() => setShowRequestForm(true)}
                disabled={isRequesting}
              >
                <span className="button-icon">📝</span>
                <span className="button-text">Request This Asset</span>
              </button>
            ) : (
              <div className="request-form">
                <div className="form-header">
                  <h4>Request Asset</h4>
                  <button
                    className="close-button"
                    onClick={() => setShowRequestForm(false)}
                    disabled={isRequesting}
                  >
                    ×
                  </button>
                </div>
                
                <textarea
                  className="reason-input"
                  placeholder="Tell us why you need this asset (optional but helpful for approval)"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  disabled={isRequesting}
                  rows="3"
                />
                
                <div className="form-actions">
                  <button
                    className="cancel-button"
                    onClick={() => setShowRequestForm(false)}
                    disabled={isRequesting}
                  >
                    Cancel
                  </button>
                  <button
                    className="submit-button"
                    onClick={handleRequest}
                    disabled={isRequesting}
                  >
                    {isRequesting ? (
                      <>
                        <span className="loading-spinner"></span>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span className="button-icon">📤</span>
                        <span>Submit Request</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Assigned Asset Info */}
        {isAssigned && (
          <div className="assigned-info">
            <div className="assigned-badge">
              <span className="assigned-icon">✅</span>
              <span className="assigned-text">Assigned to You</span>
            </div>
            <p className="assigned-description">
              This asset has been assigned to you and is ready for use.
            </p>
          </div>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="card-decoration">
        <div className="decoration-circle"></div>
        <div className="decoration-line"></div>
      </div>
    </div>
  );
};

export default AssetCard; 