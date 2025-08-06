import React from 'react';
import './Loading.css';

const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className="loading">
      <span>{message}</span>
    </div>
  );
};

export default Loading; 