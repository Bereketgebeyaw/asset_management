import React from 'react';
import './Alert.css';

const Alert = ({ type = 'info', message, onClose }) => {
  if (!message) return null;

  return (
    <div className={`alert alert-${type}`}>
      <span>
        {type === 'success' && '✓ '}
        {type === 'error' && '✗ '}
        {message}
      </span>
      {onClose && (
        <button onClick={onClose} className="alert-close">
          ×
        </button>
      )}
    </div>
  );
};

export default Alert; 