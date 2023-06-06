import './Home.css';
import CandleStick from '../chart/CandleStick';

// Per wireframe:
// Home page will contain a search input for bringing up the stock details modal.
// Home page will contain three candlestick charts for common stocks?. Composite indices are premium finnhub features.
// Home page will coantain a sector map or some other chart thing.

import React, { useState } from 'react';

const Home = () => {
  const [symbol, setSymbol] = useState('');
  const [metrics, setMetrics] = useState({});
  const [companyName, setCompanyName] = useState('');

  const handleChange = (event) => {
    setSymbol(event.target.value);
  };

  const fetchMetrics = async () => {
    try {
      const response = await fetch(
        `https://finnhub.io/api/v1/stock/metric?symbol=${symbol}&metric=all&token=${process.env.REACT_APP_FINNHUB_API_KEY}`
      );
      const data = await response.json();

      if (data.metric) {
        const {
          '10DayAverageTradingVolume': volume,
          'assetTurnoverAnnual': assetTurnover,
          'bookValuePerShareQuarterly': bookValue,
          'cashFlowPerShareAnnual': cashFlow,
          'grossMarginAnnual': grossMargin,
          'netProfitMarginAnnual': profitMargin,
          'revenuePerShareAnnual': revenuePerShare,
        } = data.metric;

        setMetrics({
          volume,
          assetTurnover,
          bookValue,
          cashFlow,
          grossMargin,
          profitMargin,
          revenuePerShare,
        });
        setCompanyName(data.metric['companyName']);
      } else {
        console.error('No metrics found for the given stock symbol.');
      }
      const profileResponse = await fetch(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`
      );
      const profileData = await profileResponse.json();

      if (profileData.name) {
        setCompanyName(profileData.name);
      } else {
        console.error('No company name found for the given stock symbol.');
      }
    } catch (error) {
      console.error('Error fetching metrics:', error);
    }
  };

  return (
    <div>
      <div className = "text-center">
      <input 
        type="text"
        value={symbol}
        onChange={handleChange}
        placeholder="Enter stock symbol"
      />
    
      <button onClick={fetchMetrics}>Fetch Metrics</button>
      {companyName && <h2>{companyName}</h2>}
        <p>10-Day Average Trading Volume: {metrics.volume}</p>
        <p>Asset Turnover (Annual): {metrics.assetTurnover}</p>
        <p>Book Value per Share (Quarterly): {metrics.bookValue}</p>
        <p>Cash Flow per Share (Annual): {metrics.cashFlow}</p>
        <p>Gross Margin (Annual): {metrics.grossMargin}</p>
        <p>Net Profit Margin (Annual): {metrics.profitMargin}</p>
        <p>Revenue per Share (Annual): {metrics.revenuePerShare}</p>
      {symbol && <div className = "d-flex justify-content-center"><CandleStick symbol1 ={symbol}/> </div> }
      </div>
      
    </div>
  );
};
export default Home;


/*
function Home() {
  return (
    <div className="home">
      {<SearchInputForStockDetails /> }
      <div className="chart-container">
        <CandleStick symbol1="AAPL" />
        <CandleStick symbol1="TSLA" />
        <CandleStick symbol1="AMZN" />
      </div>
      { <SectorMap /> }
    </div>
  );
}

export default Home;
*/