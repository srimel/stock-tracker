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
