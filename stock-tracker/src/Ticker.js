import React, { useEffect, useState } from 'react';

const TickerWebSocket = () => {
  const [tickerData, setTickerData] = useState([
    { symbol: 'AAPL', price: '', change: '', changePercent: '' },
    { symbol: 'MSFT', price: '', change: '', changePercent: '' },
    { symbol: 'AMZN', price: '', change: '', changePercent: '' },
  ]);

  useEffect(() => {
    const socket = new WebSocket(
      `wss://ws.finnhub.io?token=${process.env.REACT_APP_API_KEY}`
    );

    // Open connection
    socket.addEventListener('open', () => {
      console.log('WebSocket connection established');
      subscribeSymbols(['AAPL', 'MSFT', 'AMZN']);
    });

    // Listen for messages
    socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      if (message.data) {
        const updatedTickerData = tickerData.map((item) => {
          const matchingItem = message.data.find((data) => data.s === item.symbol);
          if (matchingItem) {
            return {
              symbol: matchingItem.s,
              price: matchingItem.p,
              change: matchingItem.c,
              changePercent: matchingItem.dp,
            };
          }
          return item;
        });
        setTickerData(updatedTickerData);
      }
    });

    // Subscribe to symbols
    const subscribeSymbols = (symbols) => {
      symbols.forEach((symbol) => {
        socket.send(JSON.stringify({ type: 'subscribe', symbol }));
      });
    };

    // Clean up the WebSocket connection when the component is unmounted
    return () => {
      socket.close();
    };
  }, [tickerData]); // Empty dependency array to ensure it runs only once

  return (
    <section className="ticker">
      {tickerData.map((item) => (
        <div className="ticker-item" key={item.symbol}>
          <span className="symbol">{item.symbol}</span>
          <span className="price">{item.price}</span>
          <div className={item.change >= 0 ? 'text-green' : 'text-red'}>
            <span className="change">
              {item.changePercent}% ({item.change})
            </span>
          </div>
        </div>
      ))}
    </section>
  );
};

export default TickerWebSocket;
