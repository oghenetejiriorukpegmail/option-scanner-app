import { getStockInfo, getStockIndicators } from './stockService';
import { getOptionsMetrics } from './optionsService';

// Types
interface ScannerFilters {
  trend?: 'bullish' | 'bearish' | 'neutral' | 'all';
  pcr?: 'bullish' | 'bearish' | 'neutral' | 'all';
  rsi?: 'bullish' | 'bearish' | 'neutral' | 'all';
  setup?: 'bullish' | 'bearish' | 'neutral' | 'all';
}

interface ScannerResult {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  trend: 'bullish' | 'bearish' | 'neutral';
  pcr: number;
  rsi: number;
  stochasticRSI: number;
  setup: 'bullish' | 'bearish' | 'neutral';
  setupStrength: number;
}

interface ScannerPreset {
  id?: string;
  name: string;
  description?: string;
  filters: ScannerFilters;
}

// Mock stock universe for scanning
const stockUniverse = ['TSLA', 'AAPL', 'MSFT', 'AMZN', 'GOOGL', 'META', 'NVDA', 'AMD'];

/**
 * Run scanner with provided filters
 * @param filters Scanner filters
 * @returns Scanner results
 */
export const runScanner = async (filters: ScannerFilters): Promise<ScannerResult[]> => {
  try {
    // In a real implementation, this would scan a larger universe of stocks
    // For now, scan a small set of mock stocks
    const results: ScannerResult[] = [];
    
    for (const symbol of stockUniverse) {
      // Get stock info
      const stockInfo = await getStockInfo(symbol);
      if (!stockInfo) continue;
      
      // Get technical indicators
      const indicators = await getStockIndicators(symbol);
      
      // Get options metrics
      const optionsMetrics = await getOptionsMetrics(symbol);
      
      // Determine trend based on EMAs
      const latestEMA10 = indicators.ema.ema10[indicators.ema.ema10.length - 1];
      const latestEMA20 = indicators.ema.ema20[indicators.ema.ema20.length - 1];
      const latestEMA50 = indicators.ema.ema50[indicators.ema.ema50.length - 1];
      
      let trend: 'bullish' | 'bearish' | 'neutral';
      if (latestEMA10 > latestEMA20 && latestEMA20 > latestEMA50) {
        trend = 'bullish';
      } else if (latestEMA10 < latestEMA20 && latestEMA20 < latestEMA50) {
        trend = 'bearish';
      } else {
        trend = 'neutral';
      }
      
      // Get latest RSI and Stochastic RSI
      const latestRSI = indicators.rsi[indicators.rsi.length - 1];
      const latestStochRSI = indicators.stochasticRSI[indicators.stochasticRSI.length - 1];
      
      // Determine setup type
      let setup: 'bullish' | 'bearish' | 'neutral';
      let setupStrength = 0;
      
      // Bullish setup conditions
      if (
        trend === 'bullish' &&
        optionsMetrics.putCallRatio < 0.8 &&
        latestRSI >= 55 && latestRSI <= 80
      ) {
        setup = 'bullish';
        setupStrength = 0.7 + Math.random() * 0.3; // 70-100%
      }
      // Bearish setup conditions
      else if (
        trend === 'bearish' &&
        optionsMetrics.putCallRatio > 1.2 &&
        latestRSI >= 20 && latestRSI <= 45
      ) {
        setup = 'bearish';
        setupStrength = 0.7 + Math.random() * 0.3; // 70-100%
      }
      // Neutral setup conditions
      else if (
        trend === 'neutral' &&
        optionsMetrics.putCallRatio >= 0.8 && optionsMetrics.putCallRatio <= 1.2
      ) {
        setup = 'neutral';
        setupStrength = 0.7 + Math.random() * 0.3; // 70-100%
      }
      // No clear setup
      else {
        // Randomly assign a setup type with low strength
        const setupTypes: ['bullish', 'bearish', 'neutral'] = ['bullish', 'bearish', 'neutral'];
        setup = setupTypes[Math.floor(Math.random() * 3)];
        setupStrength = Math.random() * 0.5; // 0-50%
      }
      
      // Create result
      const result: ScannerResult = {
        symbol: stockInfo.symbol,
        name: stockInfo.name,
        price: stockInfo.price,
        change: stockInfo.change,
        changePercent: stockInfo.changePercent,
        trend,
        pcr: optionsMetrics.putCallRatio,
        rsi: latestRSI,
        stochasticRSI: latestStochRSI,
        setup,
        setupStrength
      };
      
      // Apply filters
      if (
        (filters.trend === 'all' || filters.trend === trend) &&
        (filters.setup === 'all' || filters.setup === setup) &&
        (filters.rsi === 'all' || 
          (filters.rsi === 'bullish' && latestRSI >= 55 && latestRSI <= 80) ||
          (filters.rsi === 'bearish' && latestRSI >= 20 && latestRSI <= 45) ||
          (filters.rsi === 'neutral' && latestRSI > 45 && latestRSI < 55)
        ) &&
        (filters.pcr === 'all' || 
          (filters.pcr === 'bullish' && optionsMetrics.putCallRatio < 0.8) ||
          (filters.pcr === 'bearish' && optionsMetrics.putCallRatio > 1.2) ||
          (filters.pcr === 'neutral' && optionsMetrics.putCallRatio >= 0.8 && optionsMetrics.putCallRatio <= 1.2)
        )
      ) {
        results.push(result);
      }
    }
    
    // Sort by setup strength
    return results.sort((a, b) => b.setupStrength - a.setupStrength);
  } catch (error) {
    console.error('Error running scanner:', error);
    throw error;
  }
};

/**
 * Get saved scanner presets
 * @returns Array of scanner presets
 */
export const getScannerPresets = async (): Promise<ScannerPreset[]> => {
  try {
    // In a real implementation, this would fetch presets from a database
    // For now, return mock presets
    return [
      {
        id: '1',
        name: 'Bullish Setups',
        description: 'Find stocks with bullish trend, low PCR, and strong RSI',
        filters: {
          trend: 'bullish',
          pcr: 'bullish',
          rsi: 'bullish',
          setup: 'bullish'
        }
      },
      {
        id: '2',
        name: 'Bearish Setups',
        description: 'Find stocks with bearish trend, high PCR, and weak RSI',
        filters: {
          trend: 'bearish',
          pcr: 'bearish',
          rsi: 'bearish',
          setup: 'bearish'
        }
      },
      {
        id: '3',
        name: 'Neutral Setups',
        description: 'Find stocks with neutral trend for potential range-bound trades',
        filters: {
          trend: 'neutral',
          pcr: 'neutral',
          rsi: 'neutral',
          setup: 'neutral'
        }
      }
    ];
  } catch (error) {
    console.error('Error fetching scanner presets:', error);
    throw error;
  }
};

/**
 * Save scanner preset
 * @param preset Scanner preset to save
 * @returns Saved scanner preset
 */
export const saveScannerPreset = async (preset: ScannerPreset): Promise<ScannerPreset> => {
  try {
    // In a real implementation, this would save the preset to a database
    // For now, just return the preset with a mock ID
    return {
      ...preset,
      id: Date.now().toString()
    };
  } catch (error) {
    console.error('Error saving scanner preset:', error);
    throw error;
  }
};