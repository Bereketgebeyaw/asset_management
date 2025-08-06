import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAssets } from '../hooks/useAssets';
import { assetRequestService } from '../services/assetRequestService';
import Header from '../components/layout/Header';
import Alert from '../components/common/Alert';
import Loading from '../components/common/Loading';
import AssetCard from '../components/features/AssetCard';
import UserRequests from '../components/features/UserRequests';
import AssignedAssets from '../components/features/AssignedAssets';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const { assets, loading, error: assetsError, fetchAssets } = useAssets();
  const [requestingId, setRequestingId] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('available');

  const handleRequest = async (assetId, reason) => {
    setRequestingId(assetId);
    setError('');
    setSuccess('');
    
    try {
      const response = await assetRequestService.createRequest({
        assetId,
        reason: reason || '',
      });
      
      setSuccess(`🎉 Your request for this asset has been submitted successfully! Request ID: #${response.id}. We'll notify you once it's reviewed.`);
      
      await fetchAssets();
    } catch (err) {
      let errorMessage = 'Failed to request asset. Please try again.';
      
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data) {
        errorMessage = err.response.data;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      if (errorMessage.toLowerCase().includes('already') || errorMessage.toLowerCase().includes('pending')) {
        errorMessage = '⏳ You have already requested this asset. Please wait for the current request to be processed before making a new one.';
      } else if (errorMessage.toLowerCase().includes('unauthorized') || errorMessage.toLowerCase().includes('401')) {
        errorMessage = '🔐 Your session has expired. Please log in again.';
      } else if (errorMessage.toLowerCase().includes('not found') || errorMessage.toLowerCase().includes('404')) {
        errorMessage = '❌ This asset is no longer available. Please refresh the page.';
      }
      
      setError(errorMessage);
      console.error('Error submitting request:', err);
    } finally {
      setRequestingId(null);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'available':
        return (
          <div className="content-card">
            <div className="page-title">
              <h1>Available Assets</h1>
              <p>Browse and request the assets you need for your work</p>
            </div>
            
            {assets.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">📦</div>
                <h3>No Assets Available</h3>
                <p>There are currently no assets available for request. Please check back later or contact your administrator.</p>
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
        );
      
      case 'requests':
        return <UserRequests />;
      
      case 'assigned':
        return <AssignedAssets />;
      
      default:
        return null;
    }
  };

  if (loading && activeTab === 'available') {
    return <Loading message="Loading assets..." />;
  }

  return (
    <div className="dashboard">
      <Header />
      
      <main className="dashboard-content">
        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button
            className={`tab-button ${activeTab === 'available' ? 'active' : ''}`}
            onClick={() => setActiveTab('available')}
          >
            <span className="tab-icon">📦</span>
            <span className="tab-text">Available Assets</span>
          </button>
          
          <button
            className={`tab-button ${activeTab === 'requests' ? 'active' : ''}`}
            onClick={() => setActiveTab('requests')}
          >
            <span className="tab-icon">📋</span>
            <span className="tab-text">Asset Requests</span>
          </button>
          
          <button
            className={`tab-button ${activeTab === 'assigned' ? 'active' : ''}`}
            onClick={() => setActiveTab('assigned')}
          >
            <span className="tab-icon">✅</span>
            <span className="tab-text">Assigned Assets</span>
          </button>
        </div>

        {/* Enhanced Alerts */}
        {error && (
          <Alert 
            type="error" 
            message={error} 
            onClose={() => setError('')} 
            autoClose={true}
            duration={error.toLowerCase().includes('already') || error.toLowerCase().includes('pending') ? 10000 : 8000}
          />
        )}
        
        {success && (
          <Alert 
            type="success" 
            message={success} 
            onClose={() => setSuccess('')} 
            autoClose={true}
            duration={6000}
          />
        )}
        
        {assetsError && activeTab === 'available' && (
          <Alert 
            type="error" 
            message={`Failed to load assets: ${assetsError}`} 
            onClose={() => {}} 
            autoClose={false}
          />
        )}

        {/* Tab Content */}
        {renderTabContent()}
      </main>
    </div>
  );
};

export default Dashboard; 