import React from 'react';
import './Loader.css'; // Import the CSS for the loader

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <h1 className="brand-name">Arbilo</h1>
      <p className="loading-text">Loading, please wait...</p>
    </div>
  );
};

export default Loader;
