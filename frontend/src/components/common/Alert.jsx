import React, { useEffect, useState } from 'react';
import './Alert.css';

const Alert = ({ type = 'info', message, onClose, autoClose = true, duration = 5000 }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (autoClose && duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) {
        onClose();
      }
    }, 300);
  };

  if (!message || !isVisible) return null;

  // Check if this is an "already requested" alert
  const isAlreadyRequested = message.toLowerCase().includes('already') || 
                            message.toLowerCase().includes('pending') ||
                            message.toLowerCase().includes('wait');

  const getIcon = () => {
    if (isAlreadyRequested) {
      return '⏳';
    }
    
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return 'ℹ️';
    }
  };

  const getTitle = () => {
    if (isAlreadyRequested) {
      return 'Request Pending!';
    }
    
    switch (type) {
      case 'success':
        return 'Request Submitted!';
      case 'error':
        return 'Request Failed!';
      case 'warning':
        return 'Warning!';
      case 'info':
        return 'Info';
      default:
        return 'Info';
    }
  };

  const getAlertType = () => {
    if (isAlreadyRequested) {
      return 'warning';
    }
    return type;
  };

  return (
    <div className={`alert alert-${getAlertType()} ${isAlreadyRequested ? 'alert-pending' : ''} ${isClosing ? 'alert-closing' : ''}`}>
      <div className="alert-content">
        <div className="alert-icon">
          {getIcon()}
        </div>
        <div className="alert-message">
          <div className="alert-title">{getTitle()}</div>
          <div className="alert-text">{message}</div>
        </div>
      </div>
      {onClose && (
        <button onClick={handleClose} className="alert-close">
          <span>×</span>
        </button>
      )}
    </div>
  );
};

export default Alert; 