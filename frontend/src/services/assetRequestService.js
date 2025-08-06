import api from './api';

export const assetRequestService = {
  // Get all asset requests
  getAllRequests: async () => {
    const response = await api.get('/api/assetrequests');
    return response.data;
  },

  // Get user's asset requests
  getUserRequests: async () => {
    const response = await api.get('/api/assetrequests/my-requests');
    return response.data;
  },

  // Create new asset request
  createRequest: async (requestData) => {
    const response = await api.post('/api/assetrequests', requestData);
    return response.data;
  },

  // Update asset request
  updateRequest: async (id, requestData) => {
    const response = await api.put(`/api/assetrequests/${id}`, requestData);
    return response.data;
  },

  // Delete asset request
  deleteRequest: async (id) => {
    const response = await api.delete(`/api/assetrequests/${id}`);
    return response.data;
  },

  // Process asset request (approve/reject) - Admin only
  processRequest: async (id, processData) => {
    const response = await api.put(`/api/assetrequests/${id}/process`, processData);
    return response.data;
  },

  // Approve asset request
  approveRequest: async (id) => {
    const response = await api.put(`/api/assetrequests/${id}/process`, { status: 'Approved' });
    return response.data;
  },

  // Reject asset request
  rejectRequest: async (id, reason) => {
    const response = await api.put(`/api/assetrequests/${id}/process`, { status: 'Rejected', adminNotes: reason });
    return response.data;
  },
}; 