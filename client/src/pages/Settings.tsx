import React, { useState } from 'react';
import './Settings.css';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    apiKey: '',
    defaultSymbol: 'TSLA',
    refreshInterval: '5',
    theme: 'light',
    notifications: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would save settings to local storage or a backend
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings">
      <h1>Settings</h1>
      
      <div className="settings-container">
        <form onSubmit={handleSubmit}>
          <div className="settings-section">
            <h2>API Configuration</h2>
            
            <div className="form-group">
              <label htmlFor="apiKey">Yahoo Finance API Key</label>
              <input
                type="text"
                id="apiKey"
                name="apiKey"
                value={settings.apiKey}
                onChange={handleChange}
                placeholder="Enter your API key"
              />
              <small>Leave blank to use the default key (limited requests)</small>
            </div>
          </div>
          
          <div className="settings-section">
            <h2>Display Preferences</h2>
            
            <div className="form-group">
              <label htmlFor="defaultSymbol">Default Symbol</label>
              <input
                type="text"
                id="defaultSymbol"
                name="defaultSymbol"
                value={settings.defaultSymbol}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="refreshInterval">Data Refresh Interval (minutes)</label>
              <select
                id="refreshInterval"
                name="refreshInterval"
                value={settings.refreshInterval}
                onChange={handleChange}
              >
                <option value="1">1 minute</option>
                <option value="5">5 minutes</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="theme">Theme</label>
              <select
                id="theme"
                name="theme"
                value={settings.theme}
                onChange={handleChange}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System Default</option>
              </select>
            </div>
          </div>
          
          <div className="settings-section">
            <h2>Notifications</h2>
            
            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="notifications"
                name="notifications"
                checked={settings.notifications}
                onChange={handleChange}
              />
              <label htmlFor="notifications">Enable Notifications</label>
            </div>
            <small>Receive alerts when scanner finds matching setups</small>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="save-button">Save Settings</button>
            <button type="button" className="reset-button" onClick={() => window.location.reload()}>
              Reset to Defaults
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;