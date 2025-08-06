import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('assets');
  const [assets, setAssets] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Asset form state
  const [showAssetForm, setShowAssetForm] = useState(false);
  const [assetForm, setAssetForm] = useState({
    name: '',
    category: '',
    serialNumber: '',
    purchaseDate: '',
    status: 'Available'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [assetsResponse, requestsResponse] = await Promise.all([
        axios.get('/assets'),
        axios.get('/assetrequests')
      ]);
      setAssets(assetsResponse.data);
      setRequests(requestsResponse.data);
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
      await axios.post('/assets', assetForm);
      setShowAssetForm(false);
      setAssetForm({ name: '', category: '', serialNumber: '', purchaseDate: '', status: 'Available' });
      fetchData();
    } catch (err) {
      setError('Failed to create asset');
    }
  };

  const handleRequestAction = async (requestId, action) => {
    try {
      await axios.put(`/assetrequests/${requestId}/process`, { action });
      fetchData();
    } catch (err) {
      setError('Failed to process request');
    }
  };

  const deleteAsset = async (assetId) => {
    if (window.confirm('Are you sure you want to delete this asset?')) {
      try {
        await axios.delete(`/assets/${assetId}`);
        fetchData();
      } catch (err) {
        setError('Failed to delete asset');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="navbar">
        <div className="container">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-blue-600">Top Link Technology</div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 font-medium">Admin: {user?.email}</span>
              <button onClick={logout} className="btn btn-secondary">Logout</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container py-8">
        {/* Error Message */}
        {error && (
          <div className="alert alert-error mb-6">
            {error}
            <button onClick={() => setError('')} className="ml-2 text-white">×</button>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="tab-container">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('assets')}
              className={`tab-button ${activeTab === 'assets' ? 'active' : ''}`}
            >
              Assets Management
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`tab-button ${activeTab === 'requests' ? 'active' : ''}`}
            >
              Asset Requests ({requests.filter(r => r.status === 'Pending').length})
            </button>
          </div>
        </div>

        {/* Assets Tab */}
        {activeTab === 'assets' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Assets Management</h1>
              <button
                onClick={() => setShowAssetForm(true)}
                className="btn btn-primary"
              >
                Add New Asset
              </button>
            </div>

            {/* Asset Form Modal */}
            {showAssetForm && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <h2 className="text-2xl font-bold mb-4">Add New Asset</h2>
                  <form onSubmit={handleAssetSubmit}>
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
                        required
                      >
                        <option value="Available">Available</option>
                        <option value="Assigned">Assigned</option>
                        <option value="Maintenance">Maintenance</option>
                      </select>
                    </div>
                    <div className="flex space-x-2">
                      <button type="submit" className="btn btn-primary">Add Asset</button>
                      <button
                        type="button"
                        onClick={() => setShowAssetForm(false)}
                        className="btn btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Assets Table */}
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
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
                      <td className="font-medium">{asset.name}</td>
                      <td>{asset.category}</td>
                      <td className="font-mono text-sm">{asset.serialNumber}</td>
                      <td>{new Date(asset.purchaseDate).toLocaleDateString()}</td>
                      <td>
                        <span className={`status-badge ${
                          asset.status === 'Available' ? 'status-available' :
                          asset.status === 'Assigned' ? 'status-assigned' :
                          'status-pending'
                        }`}>
                          {asset.status}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => deleteAsset(asset.id)}
                          className="btn btn-danger"
                          style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Requests Tab */}
        {activeTab === 'requests' && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Asset Requests</h1>
            <div className="table-container">
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
                      <td className="font-medium">{request.userEmail}</td>
                      <td>{request.assetName}</td>
                      <td>{request.reason}</td>
                      <td>{new Date(request.requestDate).toLocaleDateString()}</td>
                      <td>
                        <span className={`status-badge ${
                          request.status === 'Pending' ? 'status-pending' :
                          request.status === 'Approved' ? 'status-available' :
                          'status-assigned'
                        }`}>
                          {request.status}
                        </span>
                      </td>
                      <td>
                        {request.status === 'Pending' && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleRequestAction(request.id, 'approve')}
                              className="btn btn-success"
                              style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleRequestAction(request.id, 'reject')}
                              className="btn btn-danger"
                              style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 