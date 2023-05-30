import React, { useState } from 'react';

const StockPrices = () => {
  const [symbol, setSymbol] = useState('');
  const [currentPrice, setCurrentPrice] = useState(null);
  const [change, setChange] = useState(null);
  const [companyName, setCompanyName] = useState('');

  const handleSymbolChange = (event) => {
    setSymbol(event.target.value);
  };

  const fetchStockPrice = async () => {
    try {
      const response = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=chn4661r01qsjpubcga0chn4661r01qsjpubcgag`
      );
      const data = await response.json();
      setCurrentPrice(data.c); // Assuming the property for current price is 'c'
      setChange(data.d);
      const companyResponse = await fetch(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=chn4661r01qsjpubcga0chn4661r01qsjpubcgag`
      );
      const companyData = await companyResponse.json();
      setCompanyName(companyData.name);
    } catch (error) {
      console.error('Error fetching stock price:', error);
    }
    
  };

  return (
    <div>
      <h1>Current Stock Quotes</h1>
      <input
        type="text"
        value={symbol}
        onChange={handleSymbolChange}
        placeholder="Enter stock symbol"
      />
      <button onClick={fetchStockPrice}>Get Quote</button>
      {currentPrice && (
        <div>
          <p>Symbol: {symbol}</p>
          <p>Company Name: {companyName}</p>
          <p>Current Price: {currentPrice}</p>
          <p>Change: {change}</p>
        </div>
      )}
    </div>
  );
};

export default StockPrices;