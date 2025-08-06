import React, { useState } from 'react';
import './AssetCard.css';

const AssetCard = ({ asset, onRequest, requestingId }) => {
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRequest = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await onRequest(asset.id, reason);
      setReason('');
    } catch (error) {
      // Error will be handled by the parent component
      console.error('Error requesting asset:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isRequesting = requestingId === asset.id || isSubmitting;

  return (
    <div className="asset-card">
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
      <div className="request-form">
        <textarea
          className="reason-input"
          placeholder="Reason for request (optional)"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          disabled={isRequesting}
        />
        
        <button
          className="request-btn"
          onClick={handleRequest}
          disabled={isRequesting}
        >
          {isRequesting ? (
            <>
              <span className="loading-spinner"></span>
              Requesting...
            </>
          ) : (
            'Request Asset'
          )}
        </button>
      </div>
    </div>
  );
};

export default AssetCard; 