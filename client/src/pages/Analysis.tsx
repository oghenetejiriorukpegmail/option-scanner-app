import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Analysis.css';

type AnalysisParams = {
  symbol: string;
};

const Analysis: React.FC = () => {
  const params = useParams<Record<string, string | undefined>>();
  const symbol = params.symbol || 'TSLA'; // Default to TSLA if no symbol is provided
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // In a real implementation, this would fetch data for the selected symbol
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol]);

  if (loading) {
    return (
      <div className="analysis loading">
        <p>Loading data for {symbol}...</p>
      </div>
    );
  }

  return (
    <div className="analysis">
      <h1>{symbol} Analysis</h1>
      
      <div className="analysis-grid">
        <div className="analysis-section price-chart">
          <h2>Price Chart</h2>
          <div className="chart-placeholder">
            <p>Price chart with EMAs will be displayed here.</p>
          </div>
        </div>
        
        <div className="analysis-section options-chain">
          <h2>Options Chain</h2>
          <div className="table-placeholder">
            <p>Options chain data will be displayed here.</p>
          </div>
        </div>
        
        <div className="analysis-section technical-indicators">
          <h2>Technical Indicators</h2>
          <div className="indicators-grid">
            <div className="indicator">
              <h3>Trend</h3>
              <p>EMAs: 10-day, 20-day, 50-day</p>
              <div className="indicator-value bullish">Bullish</div>
            </div>
            
            <div className="indicator">
              <h3>Sentiment</h3>
              <p>Put-Call Ratio (PCR)</p>
              <div className="indicator-value neutral">Neutral (0.95)</div>
            </div>
            
            <div className="indicator">
              <h3>Momentum</h3>
              <p>RSI (14-day)</p>
              <div className="indicator-value bullish">Bullish (65)</div>
            </div>
            
            <div className="indicator">
              <h3>Volatility</h3>
              <p>Implied Volatility (IV)</p>
              <div className="indicator-value neutral">Moderate (45%)</div>
            </div>
          </div>
        </div>
        
        <div className="analysis-section trade-setup">
          <h2>Trade Setup</h2>
          <div className="setup-details">
            <div className="setup-type bullish">
              <h3>Bullish Setup Detected</h3>
              <p>Based on trend alignment, PCR, and RSI values.</p>
            </div>
            
            <div className="setup-parameters">
              <div className="parameter">
                <span className="parameter-label">Entry:</span>
                <span className="parameter-value">Current price ($300)</span>
              </div>
              
              <div className="parameter">
                <span className="parameter-label">Target:</span>
                <span className="parameter-value">$310 (Next OI level)</span>
              </div>
              
              <div className="parameter">
                <span className="parameter-label">Stop:</span>
                <span className="parameter-value">$295 (Below support)</span>
              </div>
              
              <div className="parameter">
                <span className="parameter-label">Risk/Reward:</span>
                <span className="parameter-value">1:2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;