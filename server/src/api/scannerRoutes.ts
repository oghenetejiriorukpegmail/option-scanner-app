import express from 'express';
import { runScanner, getScannerPresets, saveScannerPreset } from '../services/scannerService';

const router = express.Router();

/**
 * @route   POST /api/scanner/run
 * @desc    Run scanner with provided filters
 * @access  Public
 */
router.post('/run', async (req, res) => {
  try {
    const filters = req.body;
    
    if (!filters) {
      return res.status(400).json({ message: 'Filters are required' });
    }
    
    const results = await runScanner(filters);
    res.json(results);
  } catch (error) {
    console.error('Error running scanner:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/scanner/presets
 * @desc    Get saved scanner presets
 * @access  Public
 */
router.get('/presets', async (req, res) => {
  try {
    const presets = await getScannerPresets();
    res.json(presets);
  } catch (error) {
    console.error('Error fetching scanner presets:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   POST /api/scanner/presets
 * @desc    Save scanner preset
 * @access  Public
 */
router.post('/presets', async (req, res) => {
  try {
    const preset = req.body;
    
    if (!preset || !preset.name || !preset.filters) {
      return res.status(400).json({ 
        message: 'Preset name and filters are required' 
      });
    }
    
    const savedPreset = await saveScannerPreset(preset);
    res.json(savedPreset);
  } catch (error) {
    console.error('Error saving scanner preset:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;