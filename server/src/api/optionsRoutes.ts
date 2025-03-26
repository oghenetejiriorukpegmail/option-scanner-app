import express from 'express';
import { getOptionsChain, getOptionsMetrics, getMaxPain } from '../services/optionsService';

const router = express.Router();

/**
 * @route   GET /api/options/:symbol/chain
 * @desc    Get options chain for a stock
 * @access  Public
 */
router.get('/:symbol/chain', async (req, res) => {
  try {
    const { symbol } = req.params;
    const expiration = req.query.expiration as string;
    
    const optionsChain = await getOptionsChain(symbol, expiration);
    res.json(optionsChain);
  } catch (error) {
    console.error('Error fetching options chain:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/options/:symbol/metrics
 * @desc    Get calculated options metrics
 * @access  Public
 */
router.get('/:symbol/metrics', async (req, res) => {
  try {
    const { symbol } = req.params;
    
    const metrics = await getOptionsMetrics(symbol);
    res.json(metrics);
  } catch (error) {
    console.error('Error fetching options metrics:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/options/:symbol/maxpain
 * @desc    Get max pain calculation
 * @access  Public
 */
router.get('/:symbol/maxpain', async (req, res) => {
  try {
    const { symbol } = req.params;
    const expiration = req.query.expiration as string;
    
    const maxPain = await getMaxPain(symbol, expiration);
    res.json(maxPain);
  } catch (error) {
    console.error('Error calculating max pain:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;