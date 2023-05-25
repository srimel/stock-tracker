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
          if (matchingItem && (matchingItem.c !== item.change || matchingItem.dp !== item.changePercent)) {
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
    <section className="ticker" style={{ display: 'flex', justifyContent: 'center', background: '#222', color: '#fff', padding: '10px' }}>
      {tickerData.map((item) => (
        (item.change !== 0 || item.changePercent !== 0) && (
          <div className="ticker-item" key={item.symbol} style={{ marginRight: '10px' }}>
            <span className="symbol" style={{ padding: '3px'}}>{item.symbol}</span>
            <span className="price">{item.price}</span>
            <div className={item.change >= 0 ? 'text-green' : 'text-red'}>
              <span className="change">
                0% (0)
              </span>
            </div>
          </div>
        )
      ))}
    </section>
  );
};

export default TickerWebSocket;
