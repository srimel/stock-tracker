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
        `https://finnhub.io/api/v1/stock/metric?symbol=${symbol}&metric=all&token=chn4661r01qsjpubcga0chn4661r01qsjpubcgag`
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
        `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=chn4661r01qsjpubcga0chn4661r01qsjpubcgag`
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
      <input
        type="text"
        value={symbol}
        onChange={handleChange}
        placeholder="Enter stock symbol"
      />
      <button onClick={fetchMetrics}>Fetch Metrics</button>
      {companyName && <h2>{companyName}</h2>}
      <ul>
        <li>10-Day Average Trading Volume: {metrics.volume}</li>
        <li>Asset Turnover (Annual): {metrics.assetTurnover}</li>
        <li>Book Value per Share (Quarterly): {metrics.bookValue}</li>
        <li>Cash Flow per Share (Annual): {metrics.cashFlow}</li>
        <li>Gross Margin (Annual): {metrics.grossMargin}</li>
        <li>Net Profit Margin (Annual): {metrics.profitMargin}</li>
        <li>Revenue per Share (Annual): {metrics.revenuePerShare}</li>
      </ul>
      <CandleStick symbol1={symbol} />
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