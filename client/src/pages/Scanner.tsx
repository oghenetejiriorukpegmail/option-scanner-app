import React, { useState } from 'react';
import './Scanner.css';

const Scanner: React.FC = () => {
  const [scannerFilters, setScannerFilters] = useState({
    trend: 'all',
    pcr: 'all',
    rsi: 'all',
    setup: 'all'
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setScannerFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would call the API to run the scanner
    console.log('Running scan with filters:', scannerFilters);
  };

  return (
    <div className="scanner">
      <h1>Options Scanner</h1>
      
      <div className="scanner-container">
        <div className="scanner-filters">
          <h2>Scanner Filters</h2>
          <form onSubmit={handleScan}>
            <div className="filter-group">
              <label htmlFor="trend">Trend</label>
              <select 
                id="trend" 
                name="trend" 
                value={scannerFilters.trend} 
                onChange={handleFilterChange}
              >
                <option value="all">All</option>
                <option value="bullish">Bullish (10 EMA {'>'} 20 EMA {'>'} 50 EMA)</option>
                <option value="bearish">Bearish (10 EMA {'<'} 20 EMA {'<'} 50 EMA)</option>
                <option value="neutral">Neutral (Flat EMAs)</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label htmlFor="pcr">Put-Call Ratio</label>
              <select 
                id="pcr" 
                name="pcr" 
                value={scannerFilters.pcr} 
                onChange={handleFilterChange}
              >
                <option value="all">All</option>
                <option value="bullish">Bullish (PCR {'<'} 0.8)</option>
                <option value="bearish">Bearish (PCR {'>'} 1.2)</option>
                <option value="neutral">Neutral (0.8 {'<'} PCR {'<'} 1.2)</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label htmlFor="rsi">RSI</label>
              <select 
                id="rsi" 
                name="rsi" 
                value={scannerFilters.rsi} 
                onChange={handleFilterChange}
              >
                <option value="all">All</option>
                <option value="bullish">Bullish (RSI 55-80)</option>
                <option value="bearish">Bearish (RSI 20-45)</option>
                <option value="neutral">Neutral (RSI 45-55)</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label htmlFor="setup">Setup Type</label>
              <select 
                id="setup" 
                name="setup" 
                value={scannerFilters.setup} 
                onChange={handleFilterChange}
              >
                <option value="all">All</option>
                <option value="bullish">Bullish Setup</option>
                <option value="bearish">Bearish Setup</option>
                <option value="neutral">Neutral Setup</option>
              </select>
            </div>
            
            <button type="submit" className="scan-button">Run Scanner</button>
          </form>
        </div>
        
        <div className="scanner-results">
          <h2>Results</h2>
          <div className="results-placeholder">
            <p>Scanner results will appear here after running a scan.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scanner;