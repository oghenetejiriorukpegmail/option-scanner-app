# Option Scanner App

A web application for retail traders to analyze stocks and options using the Options-Technical Hybrid Strategy framework.

## Project Overview

The Option Scanner App is designed to help retail traders identify trading opportunities by analyzing market context, mapping key levels, setting up trades, confirming timing, and managing risk. It integrates options data with technical analysis to provide a comprehensive view of the market.

### Key Features

- **Market Context Analysis**: Trend identification, sentiment and volatility check, momentum assessment
- **Key Levels Mapping**: Options chain analysis, max pain calculation
- **Trade Setup Rules**: Conditions and actions for bullish, bearish, and neutral setups
- **Confirmation and Timing**: Entry and exit triggers
- **Risk Management**: Position sizing, stop loss
- **Data Visualization**: Charts, tables, indicators

## Technology Stack

- **Frontend**: React.js with TypeScript, CSS
- **Backend**: Node.js, Express.js
- **Data Source**: Yahoo Finance API
- **State Management**: Redux or Context API
- **Charting Library**: TradingView Lightweight Charts or Recharts

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/oghenetejiriorukpegmail/option-scanner-app.git
   cd option-scanner-app
   ```

2. Install dependencies:
   ```
   npm run install:all
   ```

### Running the Application

1. Start the application (both frontend and backend):
   ```
   npm start
   ```

   This will start:
   - Frontend server at http://localhost:3000
   - Backend server at http://localhost:5000

2. Stop the application:
   ```
   npm run stop
   ```

   On Windows, you can also use:
   ```
   npm run stop:windows
   ```

## Development Roadmap

1. Project Setup and Basic Infrastructure
2. Core Functionality - Data Retrieval and Display
3. Trading Framework Components
4. Scanner and Advanced Features
5. Refinement and Testing

## License

This project is licensed under the MIT License - see the LICENSE file for details.