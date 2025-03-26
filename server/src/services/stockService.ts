import axios from 'axios';
import { calculateEMA, calculateRSI, calculateStochasticRSI } from '../utils/indicators';

// Types
interface StockInfo {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
}

interface StockHistory {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface StockIndicators {
  ema: {
    ema10: number[];
    ema20: number[];
    ema50: number[];
  };
  rsi: number[];
  stochasticRSI: number[];
}

/**
 * Search for stocks by symbol or name
 * @param query Search query
 * @returns Array of matching stocks
 */
export const searchStocks = async (query: string): Promise<StockInfo[]> => {
  try {
    // In a real implementation, this would call the Yahoo Finance API
    // For now, return mock data
    return [
      {
        symbol: 'TSLA',
        name: 'Tesla, Inc.',
        price: 300.00,
        change: 5.00,
        changePercent: 1.69,
        volume: 25000000,
        marketCap: 950000000000
      },
      {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        price: 175.00,
        change: 1.50,
        changePercent: 0.86,
        volume: 30000000,
        marketCap: 2800000000000
      }
    ].filter(stock => 
      stock.symbol.toLowerCase().includes(query.toLowerCase()) || 
      stock.name.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching stocks:', error);
    throw error;
  }
};

/**
 * Get basic stock information
 * @param symbol Stock symbol
 * @returns Stock information
 */
export const getStockInfo = async (symbol: string): Promise<StockInfo | null> => {
  try {
    // In a real implementation, this would call the Yahoo Finance API
    // For now, return mock data
    const mockStocks = {
      'TSLA': {
        symbol: 'TSLA',
        name: 'Tesla, Inc.',
        price: 300.00,
        change: 5.00,
        changePercent: 1.69,
        volume: 25000000,
        marketCap: 950000000000
      },
      'AAPL': {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        price: 175.00,
        change: 1.50,
        changePercent: 0.86,
        volume: 30000000,
        marketCap: 2800000000000
      }
    };
    
    return mockStocks[symbol] || null;
  } catch (error) {
    console.error('Error fetching stock info:', error);
    throw error;
  }
};

/**
 * Get historical stock data
 * @param symbol Stock symbol
 * @param period Time period (1d, 5d, 1mo, 3mo, 6mo, 1y, 2y, 5y, max)
 * @returns Array of historical data points
 */
export const getStockHistory = async (symbol: string, period: string): Promise<StockHistory[]> => {
  try {
    // In a real implementation, this would call the Yahoo Finance API
    // For now, return mock data
    return Array(30).fill(0).map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (30 - i));
      
      const basePrice = symbol === 'TSLA' ? 300 : 175;
      const randomChange = (Math.random() - 0.5) * 10;
      
      return {
        date: date.toISOString().split('T')[0],
        open: basePrice + randomChange - 1,
        high: basePrice + randomChange + 2,
        low: basePrice + randomChange - 2,
        close: basePrice + randomChange,
        volume: Math.floor(Math.random() * 10000000) + 20000000
      };
    });
  } catch (error) {
    console.error('Error fetching stock history:', error);
    throw error;
  }
};

/**
 * Get technical indicators for a stock
 * @param symbol Stock symbol
 * @returns Technical indicators
 */
export const getStockIndicators = async (symbol: string): Promise<StockIndicators> => {
  try {
    // Get historical data to calculate indicators
    const history = await getStockHistory(symbol, '1y');
    const prices = history.map(h => h.close);
    
    // Calculate indicators
    const ema10 = calculateEMA(prices, 10);
    const ema20 = calculateEMA(prices, 20);
    const ema50 = calculateEMA(prices, 50);
    const rsi = calculateRSI(prices, 14);
    const stochasticRSI = calculateStochasticRSI(prices, 14, 14, 3, 3);
    
    return {
      ema: {
        ema10,
        ema20,
        ema50
      },
      rsi,
      stochasticRSI
    };
  } catch (error) {
    console.error('Error calculating stock indicators:', error);
    throw error;
  }
};