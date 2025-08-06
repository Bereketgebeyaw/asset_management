import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAssets } from '../hooks/useAssets';
import { assetRequestService } from '../services/assetRequestService';
import Header from '../components/layout/Header';
import Alert from '../components/common/Alert';
import Loading from '../components/common/Loading';
import AssetCard from '../components/features/AssetCard';
import UserRequests from '../components/features/UserRequests';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const { assets, loading, error: assetsError, fetchAssets } = useAssets();
  const [requestingId, setRequestingId] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleRequest = async (assetId, reason) => {
    setRequestingId(assetId);
    setError('');
    setSuccess('');
    
    try {
      const response = await assetRequestService.createRequest({
        assetId,
        reason: reason || '',
      });
      
      setSuccess(`Asset request submitted successfully! Request ID: ${response.id}`);
      
      // Refresh assets to update availability
      await fetchAssets();
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                          err.response?.data || 
                          'Failed to request asset. You may already have a pending request for this asset.';
      setError(errorMessage);
      console.error('Error submitting request:', err);
    } finally {
      setRequestingId(null);
    }
  };

  if (loading) {
    return <Loading message="Loading assets..." />;
  }

  return (
    <div className="dashboard">
      <Header />
      
      <main className="dashboard-content">
        <div className="content-card">
          <div className="page-title">
            <h1>Available Assets</h1>
            <p>Browse and request the assets you need for your work</p>
          </div>
          
          {/* Alerts */}
          {error && (
            <Alert 
              type="error" 
              message={error} 
              onClose={() => setError('')} 
            />
          )}
          
          {success && (
            <Alert 
              type="success" 
              message={success} 
              onClose={() => setSuccess('')} 
            />
          )}
          
          {assetsError && (
            <Alert 
              type="error" 
              message={assetsError} 
              onClose={() => {}} 
            />
          )}
          
          {/* Assets Grid */}
          {assets.length === 0 ? (
            <div className="empty-state">
              <p>No assets are currently available for request.</p>
            </div>
          ) : (
            <div className="assets-grid">
              {assets.map((asset) => (
                <AssetCard
                  key={asset.id}
                  asset={asset}
                  onRequest={handleRequest}
                  requestingId={requestingId}
                />
              ))}
            </div>
          )}
        </div>

        {/* User Requests Section */}
        <UserRequests />
      </main>
    </div>
  );
};

export default Dashboard; 