import React from 'react';
import { useAssignedAssets } from '../../hooks/useAssignedAssets';
import AssetCard from './AssetCard';
import Loading from '../common/Loading';
import './AssignedAssets.css';

const AssignedAssets = () => {
  const { assets, loading, error } = useAssignedAssets();

  if (loading) {
    return <Loading message="Loading your assigned assets..." />;
  }

  if (error) {
    return (
      <div className="assigned-assets-container">
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="assigned-assets-container">
      <div className="assigned-assets-header">
        <div className="header-content">
          <div className="header-icon">📦</div>
          <div className="header-text">
            <h2>Your Assigned Assets</h2>
            <p>Assets that have been assigned to you</p>
          </div>
        </div>
        <div className="asset-count">
          <span className="count-number">{assets.length}</span>
          <span className="count-label">Assets</span>
        </div>
      </div>

      {assets.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>No Assigned Assets</h3>
          <p>You don't have any assigned assets yet. Browse available assets and make requests to get started!</p>
        </div>
      ) : (
        <div className="assets-grid">
          {assets.map((asset) => (
            <AssetCard
              key={asset.id}
              asset={asset}
              isAssigned={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AssignedAssets; 