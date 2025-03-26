import React from 'react';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-grid">
        <div className="dashboard-card market-overview">
          <h2>Market Overview</h2>
          <p>Market indices and overall sentiment will be displayed here.</p>
        </div>
        <div className="dashboard-card watchlist">
          <h2>Watchlist</h2>
          <p>Your watched stocks will appear here.</p>
        </div>
        <div className="dashboard-card scanner-results">
          <h2>Recent Scanner Results</h2>
          <p>Recent scanner results will be displayed here.</p>
        </div>
        <div className="dashboard-card alerts">
          <h2>Alerts</h2>
          <p>Recent alerts and notifications will appear here.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;