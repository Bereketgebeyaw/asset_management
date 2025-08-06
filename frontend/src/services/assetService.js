import api from './api';

export const assetService = {
  // Get all assets
  getAllAssets: async () => {
    const response = await api.get('/api/assets');
    return response.data;
  },

  // Get available assets
  getAvailableAssets: async () => {
    const response = await api.get('/api/assets/available');
    return response.data;
  },

  // Get assigned assets for current user
  getAssignedAssets: async () => {
    const response = await api.get('/api/assets/assigned');
    return response.data;
  },

  // Get asset by ID
  getAssetById: async (id) => {
    const response = await api.get(`/api/assets/${id}`);
    return response.data;
  },

  // Create new asset (Admin only)
  createAsset: async (assetData) => {
    const response = await api.post('/api/assets', assetData);
    return response.data;
  },

  // Update asset (Admin only)
  updateAsset: async (id, assetData) => {
    const response = await api.put(`/api/assets/${id}`, assetData);
    return response.data;
  },

  // Delete asset (Admin only)
  deleteAsset: async (id) => {
    const response = await api.delete(`/api/assets/${id}`);
    return response.data;
  },

  // Upload asset image
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
}; 