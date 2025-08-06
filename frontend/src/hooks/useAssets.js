import { useState, useEffect } from 'react';
import { assetService } from '../services/assetService';

export const useAssets = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAssets = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await assetService.getAvailableAssets();
      setAssets(data);
    } catch (err) {
      setError('Failed to fetch assets');
      console.error('Error fetching assets:', err);
    } finally {
      setLoading(false);
    }
  };

  const createAsset = async (assetData) => {
    try {
      setError('');
      const newAsset = await assetService.createAsset(assetData);
      setAssets(prev => [...prev, newAsset]);
      return newAsset;
    } catch (err) {
      setError('Failed to create asset');
      throw err;
    }
  };

  const updateAsset = async (id, assetData) => {
    try {
      setError('');
      const updatedAsset = await assetService.updateAsset(id, assetData);
      setAssets(prev => prev.map(asset => 
        asset.id === id ? updatedAsset : asset
      ));
      return updatedAsset;
    } catch (err) {
      setError('Failed to update asset');
      throw err;
    }
  };

  const deleteAsset = async (id) => {
    try {
      setError('');
      await assetService.deleteAsset(id);
      setAssets(prev => prev.filter(asset => asset.id !== id));
    } catch (err) {
      setError('Failed to delete asset');
      throw err;
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  return {
    assets,
    loading,
    error,
    fetchAssets,
    createAsset,
    updateAsset,
    deleteAsset,
  };
}; 