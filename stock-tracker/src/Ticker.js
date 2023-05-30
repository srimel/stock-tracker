import React, { useEffect, useMemo } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
//import './ticker.css';

const Ticker = () => {
  //  Configure socket
  const socketUrl = `wss://ws.finnhub.io?token=${process.env.REACT_APP_API_KEY}`;
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  //  Define stock symbols to be tracked
  const faangSymbols = useMemo(()=> ['AAPL', 'FB', 'AMZN', 'NFLX', 'GOOGL'], []);

  //  Request data from Finnhub
  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      faangSymbols.forEach((symbol) => {
        sendMessage(JSON.stringify({ type: 'subscribe', symbol }));
      });
    }
  }, [readyState, sendMessage, faangSymbols]);

  //  Log messages as they arrive
  useEffect(() => {
    if (lastMessage !== null) {
      console.log('Message:', lastMessage);
    }
  }, [lastMessage]);

  //  Render browser elements
  return (
    <div>
      <h2>Websocket Example</h2>
      <p>Connection status: {ReadyState[readyState]}</p>
    </div>
  );
  /*
  return (
    <div className="stock-ticker">
      {stockData.map((data, index) => (
        <div key={index} className="stock-item">
          //{}
        </div>
      ))}
    </div>
  );
  */
};

export default Ticker;

  /*
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
  }, []); // Empty dependency array to ensure it runs only once

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
*/