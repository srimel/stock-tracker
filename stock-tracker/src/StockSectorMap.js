import React, { useEffect, useState } from 'react';
import finnhub from 'finnhub';

const SectorMap = () => {
  const [symbols, setSymbols] = useState([]);
 
 
  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        const finnhubClient = new finnhub.DefaultApi("i put my key here");
        const response = await finnhubClient.stockSymbols('US');
        const symbolData = response.symbol;
        const symbolsWithPrice = await Promise.all(symbolData.map(async (symbol) => {
          const quoteResponse = await finnhubClient.quote(symbol.symbol);
          return { ...symbol, price: quoteResponse.c };
        }));
        setSymbols(symbolsWithPrice);
      } catch (error) {
        console.error('Error fetching stock symbols:', error);
      }
    };

    fetchSymbols();
  }, []);

  return (
    <div>
      <h1>Stock Symbols</h1>
      <ul>
        {symbols.map((symbol) => (
          <li key={symbol.symbol}>
            {symbol.symbol} - {symbol.description} - Price: {symbol.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SectorMap;
