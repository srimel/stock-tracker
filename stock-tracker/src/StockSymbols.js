import React, { useEffect, useState } from 'react';

const StockSymbols = () => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    fetchStockData();
  }, []);

  const fetchStockData = async () => {
    try {
      const response = await fetch(
        'https://finnhub.io/api/v1/stock/symbol?exchange=US&token=chn4661r01qsjpubcga0chn4661r01qsjpubcgag'
      );
      const data = await response.json();
      const symbols = data.map((stock) => stock.symbol);

      const pricePromises = symbols.map(async (symbol) => {
        const priceResponse = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=chn4661r01qsjpubcga0chn4661r01qsjpubcgag`
        );
        const priceData = await priceResponse.json();
        return {
          symbol: symbol,
          price: priceData.c, 
        };
      });

      const prices = await Promise.all(pricePromises);
      setStockData(prices);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  return (
    <div>
      <h1>Stock Prices</h1>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Current Price</th>
          </tr>
        </thead>
        <tbody>
          {stockData.map((stock) => (
            <tr key={stock.symbol}>
              <td>{stock.symbol}</td>
              <td>{stock.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockSymbols;