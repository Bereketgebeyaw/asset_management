import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { assetService } from '../services/assetService';
import { assetRequestService } from '../services/assetRequestService';
import Alert from '../components/common/Alert';
import Loading from '../components/common/Loading';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [assets, setAssets] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Asset form state
  const [showAssetForm, setShowAssetForm] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);
  const [assetForm, setAssetForm] = useState({
    name: '',
    category: '',
    serialNumber: '',
    purchaseDate: '',
    status: 'Available',
    imageUrl: '',
    imageData: '',
    imageContentType: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'Admin') {
      navigate('/dashboard');
      return;
    }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      const [assetsResponse, requestsResponse] = await Promise.all([
        assetService.getAllAssets(),
        assetRequestService.getAllRequests()
      ]);
      setAssets(assetsResponse);
      setRequests(requestsResponse);
    } catch (err) {
      setError('Failed to fetch data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAssetSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      
      if (editingAsset) {
        // For updates, exclude status field since it's disabled and shouldn't be changed
        const { status, ...updatePayload } = assetForm;
        const payload = {
          ...updatePayload,
          purchaseDate: assetForm.purchaseDate ? new Date(assetForm.purchaseDate).toISOString() : '',
        };
        await assetService.updateAsset(editingAsset.id, payload);
        setSuccess('Asset updated successfully!');
      } else {
        // For new assets, include all fields including status
        const payload = {
          ...assetForm,
          purchaseDate: assetForm.purchaseDate ? new Date(assetForm.purchaseDate).toISOString() : '',
        };
        await assetService.createAsset(payload);
        setSuccess('Asset created successfully!');
      }

      setShowAssetForm(false);
      setEditingAsset(null);
      setAssetForm({ name: '', category: '', serialNumber: '', purchaseDate: '', status: 'Available', imageUrl: '', imageData: '', imageContentType: '' });
      fetchData();
    } catch (err) {
      setError('Failed to save asset');
      console.error('Error saving asset:', err);
    }
  };

  const handleRequestAction = async (requestId, action) => {
    try {
      setError('');
      await assetRequestService.processRequest(requestId, { status: action === 'approve' ? 'Approved' : 'Rejected' });
      setSuccess(`Request ${action === 'approve' ? 'approved' : 'rejected'} successfully!`);
      fetchData();
    } catch (err) {
      setError('Failed to process request');
      console.error('Error processing request:', err);
    }
  };

  const deleteAsset = async (assetId) => {
    if (window.confirm('Are you sure you want to delete this asset?')) {
      try {
        setError('');
        await assetService.deleteAsset(assetId);
        setSuccess('Asset deleted successfully!');
        fetchData();
      } catch (err) {
        setError('Failed to delete asset');
        console.error('Error deleting asset:', err);
      }
    }
  };

  const editAsset = (asset) => {
    setEditingAsset(asset);
    setAssetForm({
      name: asset.name,
      category: asset.category,
      serialNumber: asset.serialNumber,
      purchaseDate: asset.purchaseDate ? new Date(asset.purchaseDate).toISOString().split('T')[0] : '',
      status: asset.status,
      imageUrl: asset.imageUrl || '',
      imageData: asset.imageData || '',
      imageContentType: asset.imageContentType || ''
    });
    setShowAssetForm(true);
  };

  const handleFileUpload = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5124';
      const response = await fetch(`${baseURL}/api/fileupload/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Upload failed');
      }
      
      const data = await response.json();
      setAssetForm(prev => ({ 
        ...prev, 
        imageUrl: data.imageUrl || '',
        imageData: data.imageData || '',
        imageContentType: data.contentType || ''
      }));
      setSelectedFile(null);
    } catch (err) {
      setError(`Failed to upload image: ${err.message}`);
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      handleFileUpload(file);
    }
  };

  const getStats = () => {
    const pendingRequests = requests.filter(r => r.status === 'Pending').length;
    return { pendingRequests };
  };

  const stats = getStats();

  if (loading) {
    return <Loading message="Loading admin dashboard..." />;
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="header-title">Admin Dashboard</h1>
            <p className="header-subtitle">Manage assets and requests</p>
          </div>
          <div className="header-right">
            <div className="user-info">
              <span className="user-role">Admin</span>
              <span className="user-email">{user?.email}</span>
            </div>
            <button onClick={logout} className="logout-button">
              <span className="logout-icon">🚪</span>
              <span className="logout-text">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="admin-content">
        {/* Alerts */}
        {error && (
          <Alert 
            type="error" 
            message={error} 
            onClose={() => setError('')} 
            autoClose={true}
            duration={5000}
          />
        )}
        
        {success && (
          <Alert 
            type="success" 
            message={success} 
            onClose={() => setSuccess('')} 
            autoClose={true}
            duration={3000}
          />
        )}

        {/* Tab Navigation */}
        <div className="admin-tabs">
          <button
            className={`admin-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span className="tab-icon">📊</span>
            <span className="tab-text">Overview</span>
          </button>
          <button
            className={`admin-tab ${activeTab === 'assets' ? 'active' : ''}`}
            onClick={() => setActiveTab('assets')}
          >
            <span className="tab-icon">📦</span>
            <span className="tab-text">Assets Management</span>
          </button>
          <button
            className={`admin-tab ${activeTab === 'requests' ? 'active' : ''}`}
            onClick={() => setActiveTab('requests')}
          >
            <span className="tab-icon">📋</span>
            <span className="tab-text">Asset Requests</span>
            {stats.pendingRequests > 0 && (
              <span className="request-badge">{stats.pendingRequests}</span>
            )}
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="recent-activity">
              <h2 className="section-title">Recent Activity</h2>
              <div className="activity-list">
                {requests.slice(0, 5).map((request) => (
                  <div key={request.id} className="activity-item">
                    <div className="activity-icon">📋</div>
                    <div className="activity-content">
                      <p className="activity-text">
                        <strong>{request.userEmail}</strong> requested <strong>{request.assetName}</strong>
                      </p>
                      <span className="activity-time">
                        {new Date(request.requestDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className={`activity-status ${request.status.toLowerCase()}`}>
                      {request.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Assets Tab */}
        {activeTab === 'assets' && (
          <div className="assets-section">
            <div className="section-header">
              <h2 className="section-title">Assets Management</h2>
              <button
                onClick={() => setShowAssetForm(true)}
                className="add-asset-button"
              >
                <span className="button-icon">➕</span>
                <span className="button-text">Add New Asset</span>
              </button>
            </div>

            {/* Asset Form Modal */}
            {showAssetForm && (
              <div className="modal-overlay" onClick={() => setShowAssetForm(false)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header">
                    <h2 className="modal-title">
                      {editingAsset ? 'Edit Asset' : 'Add New Asset'}
                    </h2>
                    <button
                      onClick={() => {
                        setShowAssetForm(false);
                        setEditingAsset(null);
                        setAssetForm({ name: '', category: '', serialNumber: '', purchaseDate: '', status: 'Available', imageUrl: '', imageData: '', imageContentType: '' });
                      }}
                      className="modal-close"
                    >
                      ×
                    </button>
                  </div>
                  <form onSubmit={handleAssetSubmit} className="asset-form">
                    <div className="form-grid">
                      <div className="form-group">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-input"
                          value={assetForm.name}
                          onChange={(e) => setAssetForm({...assetForm, name: e.target.value})}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Category</label>
                        <select
                          className="form-input"
                          value={assetForm.category}
                          onChange={(e) => setAssetForm({...assetForm, category: e.target.value})}
                          required
                        >
                          <option value="">Select Category</option>
                          <option value="Laptop">Laptop</option>
                          <option value="Phone">Phone</option>
                          <option value="Monitor">Monitor</option>
                          <option value="Tablet">Tablet</option>
                          <option value="Printer">Printer</option>
                          <option value="Scanner">Scanner</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Serial Number</label>
                        <input
                          type="text"
                          className="form-input"
                          value={assetForm.serialNumber}
                          onChange={(e) => setAssetForm({...assetForm, serialNumber: e.target.value})}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Purchase Date</label>
                        <input
                          type="date"
                          className="form-input"
                          value={assetForm.purchaseDate}
                          onChange={(e) => setAssetForm({...assetForm, purchaseDate: e.target.value})}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Status</label>
                        <select
                          className="form-input"
                          value={assetForm.status}
                          onChange={(e) => setAssetForm({...assetForm, status: e.target.value})}
                          disabled={editingAsset}
                          required
                        >
                          <option value="Available">Available</option>
                          <option value="Assigned">Assigned</option>
                          <option value="Maintenance">Maintenance</option>
                        </select>
                        {editingAsset && (
                          <small className="form-help-text">
                            Status can only be changed through asset requests
                          </small>
                        )}
                      </div>
                      <div className="form-group">
                        <label className="form-label">Asset Image</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="form-input"
                          disabled={uploading}
                        />
                        {uploading && <p className="upload-status">Uploading...</p>}
                        {(assetForm.imageUrl || assetForm.imageData) && (
                          <div className="image-preview">
                            <img 
                              src={assetForm.imageData ? `data:${assetForm.imageContentType};base64,${assetForm.imageData}` : assetForm.imageUrl} 
                              alt="Asset preview" 
                              className="preview-image"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="form-actions">
                      <button type="submit" className="submit-button">
                        {editingAsset ? 'Update Asset' : 'Add Asset'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowAssetForm(false);
                          setEditingAsset(null);
                          setAssetForm({ name: '', category: '', serialNumber: '', purchaseDate: '', status: 'Available', imageUrl: '', imageData: '', imageContentType: '' });
                        }}
                        className="cancel-button"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Assets Table */}
            <div className="assets-table">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Serial Number</th>
                      <th>Purchase Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assets.map((asset) => (
                      <tr key={asset.id}>
                        <td>
                          {(asset.imageUrl || asset.imageData) ? (
                            <img 
                              src={asset.imageData ? `data:${asset.imageContentType};base64,${asset.imageData}` : asset.imageUrl} 
                              alt={asset.name}
                              className="asset-image"
                            />
                          ) : (
                            <div className="no-image">
                              <span>No Image</span>
                            </div>
                          )}
                        </td>
                        <td className="asset-name">{asset.name}</td>
                        <td className="asset-category">{asset.category}</td>
                        <td className="asset-serial">{asset.serialNumber}</td>
                        <td className="asset-date">
                          {new Date(asset.purchaseDate).toLocaleDateString()}
                        </td>
                        <td>
                          <span className={`status-badge ${asset.status.toLowerCase()}`}>
                            {asset.status}
                          </span>
                        </td>
                        <td className="asset-actions">
                          <button
                            onClick={() => editAsset(asset)}
                            className={`action-button edit ${(asset.status === 'Approved' || asset.status === 'Assigned') ? 'disabled' : ''}`}
                            disabled={asset.status === 'Approved' || asset.status === 'Assigned'}
                            title={asset.status === 'Approved' || asset.status === 'Assigned' ? 'Cannot edit approved or assigned assets' : 'Edit asset'}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => deleteAsset(asset.id)}
                            className="action-button delete"
                          >
                            🗑️ Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Requests Tab */}
        {activeTab === 'requests' && (
          <div className="requests-section">
            <h2 className="section-title">Asset Requests</h2>
            <div className="requests-table">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Asset</th>
                      <th>Reason</th>
                      <th>Request Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((request) => (
                      <tr key={request.id}>
                        <td className="user-email">{request.userEmail}</td>
                        <td className="asset-name">{request.assetName}</td>
                        <td className="request-reason">{request.reason || 'No reason provided'}</td>
                        <td className="request-date">
                          {new Date(request.requestDate).toLocaleDateString()}
                        </td>
                        <td>
                          <span className={`status-badge ${request.status.toLowerCase()}`}>
                            {request.status}
                          </span>
                        </td>
                        <td className="request-actions">
                          {request.status === 'Pending' && (
                            <div className="action-buttons">
                              <button
                                onClick={() => handleRequestAction(request.id, 'approve')}
                                className="action-button approve"
                              >
                                ✅ Approve
                              </button>
                              <button
                                onClick={() => handleRequestAction(request.id, 'reject')}
                                className="action-button reject"
                              >
                                ❌ Reject
                              </button>
                            </div>
                          )}
                          {request.status !== 'Pending' && (
                            <span className="processed-status">
                              {request.status === 'Approved' ? '✅ Approved' : '❌ Rejected'}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard; 