import axios from 'axios';

// Types
interface OptionContract {
  strike: number;
  expiration: string;
  lastPrice: number;
  bid: number;
  ask: number;
  change: number;
  percentChange: number;
  volume: number;
  openInterest: number;
  impliedVolatility: number;
  delta?: number;
  gamma?: number;
  theta?: number;
  vega?: number;
  charm?: number;
  vanna?: number;
  vomma?: number;
}

interface OptionsChain {
  calls: OptionContract[];
  puts: OptionContract[];
  expirationDates: string[];
}

interface OptionsMetrics {
  putCallRatio: number;
  impliedVolatility: number;
  volumeWeightedIV: number;
  gammaExposure: number;
}

interface MaxPain {
  strike: number;
  painByStrike: { [key: string]: number };
}

/**
 * Get options chain for a stock
 * @param symbol Stock symbol
 * @param expiration Expiration date (optional)
 * @returns Options chain
 */
export const getOptionsChain = async (symbol: string, expiration?: string): Promise<OptionsChain> => {
  try {
    // In a real implementation, this would call the Yahoo Finance API
    // For now, return mock data
    
    // Generate expiration dates (every Friday for the next 4 weeks)
    const expirationDates = Array(4).fill(0).map((_, i) => {
      const date = new Date();
      // Find the next Friday
      date.setDate(date.getDate() + ((5 - date.getDay() + 7) % 7) + (i * 7));
      return date.toISOString().split('T')[0];
    });
    
    // Use provided expiration or default to the first one
    const targetExpiration = expiration || expirationDates[0];
    
    // Generate mock option contracts
    const basePrice = symbol === 'TSLA' ? 300 : 175;
    const strikes = Array(15).fill(0).map((_, i) => basePrice - 40 + (i * 5));
    
    const calls = strikes.map(strike => ({
      strike,
      expiration: targetExpiration,
      lastPrice: Math.max(0, (basePrice - strike) + Math.random() * 5),
      bid: Math.max(0, (basePrice - strike) + Math.random() * 4),
      ask: Math.max(0, (basePrice - strike) + Math.random() * 6),
      change: (Math.random() - 0.5) * 2,
      percentChange: (Math.random() - 0.5) * 10,
      volume: Math.floor(Math.random() * 1000) + 100,
      openInterest: Math.floor(Math.random() * 5000) + 500,
      impliedVolatility: Math.random() * 0.3 + 0.3,
      delta: Math.min(1, Math.max(0, (basePrice - strike) / 50 + 0.5)),
      gamma: Math.random() * 0.05,
      theta: -Math.random() * 0.2,
      vega: Math.random() * 0.2,
      charm: Math.random() * 0.02 - 0.01,
      vanna: Math.random() * 0.05 - 0.025,
      vomma: Math.random() * 0.15
    }));
    
    const puts = strikes.map(strike => ({
      strike,
      expiration: targetExpiration,
      lastPrice: Math.max(0, (strike - basePrice) + Math.random() * 5),
      bid: Math.max(0, (strike - basePrice) + Math.random() * 4),
      ask: Math.max(0, (strike - basePrice) + Math.random() * 6),
      change: (Math.random() - 0.5) * 2,
      percentChange: (Math.random() - 0.5) * 10,
      volume: Math.floor(Math.random() * 1000) + 100,
      openInterest: Math.floor(Math.random() * 5000) + 500,
      impliedVolatility: Math.random() * 0.3 + 0.3,
      delta: Math.min(0, Math.max(-1, (basePrice - strike) / 50 - 0.5)),
      gamma: Math.random() * 0.05,
      theta: -Math.random() * 0.2,
      vega: Math.random() * 0.2,
      charm: Math.random() * 0.02 - 0.01,
      vanna: Math.random() * 0.05 - 0.025,
      vomma: Math.random() * 0.15
    }));
    
    return {
      calls,
      puts,
      expirationDates
    };
  } catch (error) {
    console.error('Error fetching options chain:', error);
    throw error;
  }
};

/**
 * Get calculated options metrics
 * @param symbol Stock symbol
 * @returns Options metrics
 */
export const getOptionsMetrics = async (symbol: string): Promise<OptionsMetrics> => {
  try {
    // In a real implementation, this would calculate metrics from real options data
    // For now, return mock data
    return {
      putCallRatio: Math.random() * 0.8 + 0.6, // Between 0.6 and 1.4
      impliedVolatility: Math.random() * 0.3 + 0.3, // Between 30% and 60%
      volumeWeightedIV: Math.random() * 0.3 + 0.3, // Between 30% and 60%
      gammaExposure: (Math.random() - 0.5) * 2000000000 // Between -1B and 1B
    };
  } catch (error) {
    console.error('Error calculating options metrics:', error);
    throw error;
  }
};

/**
 * Calculate max pain
 * @param symbol Stock symbol
 * @param expiration Expiration date (optional)
 * @returns Max pain calculation
 */
export const getMaxPain = async (symbol: string, expiration?: string): Promise<MaxPain> => {
  try {
    // Get options chain
    const chain = await getOptionsChain(symbol, expiration);
    
    // Calculate pain at each strike
    const strikes = [...new Set([...chain.calls.map(c => c.strike), ...chain.puts.map(p => p.strike)])].sort((a, b) => a - b);
    
    const painByStrike: { [key: string]: number } = {};
    
    strikes.forEach(strike => {
      let totalPain = 0;
      
      // Pain from calls
      chain.calls.forEach(call => {
        if (strike > call.strike) {
          totalPain += call.openInterest * (strike - call.strike);
        }
      });
      
      // Pain from puts
      chain.puts.forEach(put => {
        if (strike < put.strike) {
          totalPain += put.openInterest * (put.strike - strike);
        }
      });
      
      painByStrike[strike.toString()] = totalPain;
    });
    
    // Find strike with minimum pain
    const minPainStrike = strikes.reduce((minStrike, strike) => {
      return painByStrike[strike.toString()] < painByStrike[minStrike.toString()] ? strike : minStrike;
    }, strikes[0]);
    
    return {
      strike: minPainStrike,
      painByStrike
    };
  } catch (error) {
    console.error('Error calculating max pain:', error);
    throw error;
  }
};