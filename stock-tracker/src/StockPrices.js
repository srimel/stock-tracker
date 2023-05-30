import React, { useState } from 'react';
import './StockPrices.css';

const StockPrices = () => {
  const [symbol1, setSymbol1] = useState('');
  const [symbol2, setSymbol2] = useState('');
  const [currentPrice1, setCurrentPrice1] = useState(null);
  const [currentPrice2, setCurrentPrice2] = useState(null);
  const [change1, setChange1] = useState(null);
  const [change2, setChange2] = useState(null);
  const [companyName1, setCompanyName1] = useState('');
  const [companyName2, setCompanyName2] = useState('');

  const handleSymbolChange = (event, symbolNumber) => {
    const symbol = event.target.value;
    if (symbolNumber === 1) {
      setSymbol1(symbol);
    } else if (symbolNumber === 2) {
      setSymbol2(symbol);
    }
  };

  const fetchStockPrice = async () => {
    try {
      const response1 = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol1}&token=chn4661r01qsjpubcga0chn4661r01qsjpubcgag`
      );
      const data1 = await response1.json();
      setCurrentPrice1(data1.c);
      setChange1(data1.d);

      const companyResponse1 = await fetch(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol1}&token=chn4661r01qsjpubcga0chn4661r01qsjpubcgag`
      );
      const companyData1 = await companyResponse1.json();
      setCompanyName1(companyData1.name);

      const response2 = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol2}&token=chn4661r01qsjpubcga0chn4661r01qsjpubcgag`
      );
      const data2 = await response2.json();
      setCurrentPrice2(data2.c);
      setChange2(data2.d);

      const companyResponse2 = await fetch(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol2}&token=chn4661r01qsjpubcga0chn4661r01qsjpubcgag`
      );
      const companyData2 = await companyResponse2.json();
      setCompanyName2(companyData2.name);
    } catch (error) {
      console.error('Error fetching stock price:', error);
    }
  };

  return (
    <div>
      <h1>Stock Prices</h1>
      <div>
        <input
          type="text"
          value={symbol1}
          onChange={(event) => handleSymbolChange(event, 1)}
          placeholder="Enter stock symbol"
        />
        <input
          type="text"
          value={symbol2}
          onChange={(event) => handleSymbolChange(event, 2)}
          placeholder="Enter stock symbol"
        />
        <button onClick={fetchStockPrice}>Get Prices</button>
      </div>
      {currentPrice1 && currentPrice2 && (
        <div>
          <div>
            <h2>{companyName1}</h2>
            <p>Symbol: {symbol1}</p>
            <p>Current Price: {currentPrice1}</p>
            <p>Change: {change1}</p>
          </div>
          <div>
            <h2>{companyName2}</h2>
            <p>Symbol: {symbol2}</p>
            <p>Current Price: {currentPrice2}</p>
            <p>Change: {change2}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockPrices;