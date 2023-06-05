import React, { useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import './ticker.css';

  //  Define stock symbols to be tracked without re-defining every render
  //const faangSymbols = useMemo(()=> ['AAPL', 'FB', 'AMZN', 'NFLX', 'GOOGL'], []);
  //const faangSymbols = ['AAPL', 'FB', 'AMZN', 'NFLX', 'GOOGL'];

const Ticker = () => {
  //  Configure socket for receiving stock data
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    `wss://ws.finnhub.io?token=${process.env.REACT_APP_FINNHUB_API_KEY}`
  );
  //  TODO: condense this
  //  TODO: remove dummy values, test when market is open
  //  Define state to store ticker data
  const [tickerData, setTickerData] = useState([
    { symbol: 'AAPL', price: '150.00', change: '-2.50', changePercent: '-1.64' },
    { symbol: 'FB', price: '350.00', change: '4.25', changePercent: '1.23' },
    { symbol: 'AMZN', price: '3200.00', change: '-15.75', changePercent: '-0.49' },
    { symbol: 'NFLX', price: '500.00', change: '8.50', changePercent: '1.73' },
    { symbol: 'GOOGL', price: '2500.00', change: '-20.25', changePercent: '-0.80' },
  ]);
  //  Request data from Finnhub when socket is ready
  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      tickerData.forEach((stock) => {
        sendMessage(JSON.stringify({ type: 'subscribe', symbol: stock.symbol }));
      });
    }
  }, [readyState, sendMessage, tickerData]);

  //  Update ticker data whenever a new message arrives
  useEffect(() => {
    if (lastMessage !== null) {
      console.log('Message:', lastMessage);
      const messageData = JSON.parse(lastMessage.data);
      setTickerData((prevTickerData) => {
        return prevTickerData.map((stock) => {
          if (stock.symbol === messageData.symbol) {
            return {
              ...stock,
              price: messageData.price.toFixed(2),
              change: messageData.change.toFixed(2),
              changePercent: `${messageData.changep.toFixed(2)}%`,
            };
          }
          return stock;
        });
      });
    }
  }, [lastMessage]);

  //  Render browser elements
  return (
    <div className="stock-ticker-container">
      <div className="stock-ticker bg-dark text-light p-1">
        {tickerData.map((stock, index) => (
          <div key={index} className="stock-item d-inline-block">
            <span className="stock-symbol">{stock.symbol}</span>
            <span className="stock-price">{stock.price}</span>
            <div className="stock-change-wrapper d-flex justify-content-center">
              <div className={`stock-change ${stock.change < 0 ? 'negative' : ''}`}>
                <span className={`arrow ${stock.change < 0 ? 'negative' : ''}`}>
                  {stock.change < 0 ? '\u25BC' : '\u25B2'}
                </span>
                <span className="stock-change-percent">{stock.changePercent}%</span>
                ({stock.change})
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
