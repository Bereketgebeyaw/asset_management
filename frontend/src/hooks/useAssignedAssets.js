import { useState, useEffect } from 'react';
import { assetService } from '../services/assetService';

export const useAssignedAssets = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAssignedAssets = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await assetService.getAssignedAssets();
      setAssets(data);
    } catch (err) {
      setError('Failed to fetch assigned assets');
      console.error('Error fetching assigned assets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignedAssets();
  }, []);

  return {
    assets,
    loading,
    error,
    fetchAssignedAssets
  };
}; 