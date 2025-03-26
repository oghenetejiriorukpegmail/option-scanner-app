/**
 * Calculate Exponential Moving Average (EMA)
 * @param prices Array of price data
 * @param period EMA period
 * @returns Array of EMA values
 */
export const calculateEMA = (prices: number[], period: number): number[] => {
  const ema: number[] = [];
  const multiplier = 2 / (period + 1);
  
  // Start with SMA for the first period
  let sum = 0;
  for (let i = 0; i < period; i++) {
    sum += prices[i];
  }
  ema.push(sum / period);
  
  // Calculate EMA for the rest of the prices
  for (let i = period; i < prices.length; i++) {
    ema.push((prices[i] - ema[ema.length - 1]) * multiplier + ema[ema.length - 1]);
  }
  
  return ema;
};

/**
 * Calculate Relative Strength Index (RSI)
 * @param prices Array of price data
 * @param period RSI period
 * @returns Array of RSI values
 */
export const calculateRSI = (prices: number[], period: number): number[] => {
  const rsi: number[] = [];
  const gains: number[] = [];
  const losses: number[] = [];
  
  // Calculate price changes
  for (let i = 1; i < prices.length; i++) {
    const change = prices[i] - prices[i - 1];
    gains.push(change > 0 ? change : 0);
    losses.push(change < 0 ? Math.abs(change) : 0);
  }
  
  // Calculate initial average gain and loss
  let avgGain = 0;
  let avgLoss = 0;
  
  for (let i = 0; i < period; i++) {
    avgGain += gains[i];
    avgLoss += losses[i];
  }
  
  avgGain /= period;
  avgLoss /= period;
  
  // Calculate first RSI
  let rs = avgGain / (avgLoss === 0 ? 0.001 : avgLoss); // Avoid division by zero
  rsi.push(100 - (100 / (1 + rs)));
  
  // Calculate remaining RSIs
  for (let i = period; i < gains.length; i++) {
    avgGain = ((avgGain * (period - 1)) + gains[i]) / period;
    avgLoss = ((avgLoss * (period - 1)) + losses[i]) / period;
    
    rs = avgGain / (avgLoss === 0 ? 0.001 : avgLoss); // Avoid division by zero
    rsi.push(100 - (100 / (1 + rs)));
  }
  
  return rsi;
};

/**
 * Calculate Stochastic RSI
 * @param prices Array of price data
 * @param rsiPeriod RSI period
 * @param stochPeriod Stochastic period
 * @param kPeriod %K period
 * @param dPeriod %D period
 * @returns Array of Stochastic RSI values
 */
export const calculateStochasticRSI = (
  prices: number[],
  rsiPeriod: number,
  stochPeriod: number,
  kPeriod: number,
  dPeriod: number
): number[] => {
  // Calculate RSI
  const rsiValues = calculateRSI(prices, rsiPeriod);
  
  // Calculate Stochastic RSI
  const stochRSI: number[] = [];
  
  for (let i = stochPeriod - 1; i < rsiValues.length; i++) {
    // Find highest and lowest RSI values in the stochastic period
    let highestRSI = -Infinity;
    let lowestRSI = Infinity;
    
    for (let j = i - stochPeriod + 1; j <= i; j++) {
      highestRSI = Math.max(highestRSI, rsiValues[j]);
      lowestRSI = Math.min(lowestRSI, rsiValues[j]);
    }
    
    // Calculate %K
    const k = (rsiValues[i] - lowestRSI) / (highestRSI - lowestRSI + 0.001) * 100;
    stochRSI.push(k);
  }
  
  // Apply smoothing to %K (optional)
  if (kPeriod > 1) {
    const smoothedK: number[] = [];
    for (let i = kPeriod - 1; i < stochRSI.length; i++) {
      let sum = 0;
      for (let j = i - kPeriod + 1; j <= i; j++) {
        sum += stochRSI[j];
      }
      smoothedK.push(sum / kPeriod);
    }
    return smoothedK;
  }
  
  return stochRSI;
};

/**
 * Calculate Simple Moving Average (SMA)
 * @param prices Array of price data
 * @param period SMA period
 * @returns Array of SMA values
 */
export const calculateSMA = (prices: number[], period: number): number[] => {
  const sma: number[] = [];
  
  for (let i = period - 1; i < prices.length; i++) {
    let sum = 0;
    for (let j = i - period + 1; j <= i; j++) {
      sum += prices[j];
    }
    sma.push(sum / period);
  }
  
  return sma;
};

/**
 * Calculate Bollinger Bands
 * @param prices Array of price data
 * @param period Bollinger Bands period
 * @param multiplier Standard deviation multiplier
 * @returns Object with upper, middle, and lower bands
 */
export const calculateBollingerBands = (
  prices: number[],
  period: number,
  multiplier: number
): { upper: number[], middle: number[], lower: number[] } => {
  const middle = calculateSMA(prices, period);
  const upper: number[] = [];
  const lower: number[] = [];
  
  for (let i = period - 1; i < prices.length; i++) {
    let sum = 0;
    for (let j = i - period + 1; j <= i; j++) {
      sum += Math.pow(prices[j] - middle[i - period + 1], 2);
    }
    const stdDev = Math.sqrt(sum / period);
    
    upper.push(middle[i - period + 1] + (multiplier * stdDev));
    lower.push(middle[i - period + 1] - (multiplier * stdDev));
  }
  
  return { upper, middle, lower };
};