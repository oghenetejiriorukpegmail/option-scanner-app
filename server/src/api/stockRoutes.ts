import express from 'express';
import { getStockInfo, getStockHistory, getStockIndicators, searchStocks } from '../services/stockService';

const router = express.Router();

/**
 * @route   GET /api/stocks/search
 * @desc    Search for stocks by symbol or name
 * @access  Public
 */
router.get('/search', async (req, res) => {
  try {
    const query = req.query.query as string;
    if (!query) {
      return res.status(400).json({ message: 'Query parameter is required' });
    }
    
    const results = await searchStocks(query);
    res.json(results);
  } catch (error) {
    console.error('Error searching stocks:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/stocks/:symbol
 * @desc    Get basic stock information
 * @access  Public
 */
router.get('/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const stockInfo = await getStockInfo(symbol);
    
    if (!stockInfo) {
      return res.status(404).json({ message: 'Stock not found' });
    }
    
    res.json(stockInfo);
  } catch (error) {
    console.error('Error fetching stock info:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/stocks/:symbol/history
 * @desc    Get historical stock data
 * @access  Public
 */
router.get('/:symbol/history', async (req, res) => {
  try {
    const { symbol } = req.params;
    const period = req.query.period as string || '1y';
    
    const history = await getStockHistory(symbol, period);
    res.json(history);
  } catch (error) {
    console.error('Error fetching stock history:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/stocks/:symbol/indicators
 * @desc    Get technical indicators for a stock
 * @access  Public
 */
router.get('/:symbol/indicators', async (req, res) => {
  try {
    const { symbol } = req.params;
    const indicators = await getStockIndicators(symbol);
    res.json(indicators);
  } catch (error) {
    console.error('Error fetching stock indicators:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;