import React, { useEffect, useState, useRef } from 'react';
import useWebSocket from 'react-use-websocket';
import './ticker.css';

//  TODO: update on-screen numbers beyond zero value

const Ticker = () => {
  const [tickerData, setTickerData] = useState(
    [
      'AAPL', 'FB', 'AMZN', 'NFLX', 'GOOGL', 'MSFT', 'NVDA', 'TSLA', 'INTC',
      'AMD', 'IBM', 'CRM', 'ORCL', 'ADBE', 'PYPL', 'TWTR', 'SQ', 'CRM', 'SNAP',
      //'SHOP', 'UBER', 'ZM', 'DOCU', 'PTON', 'ROKU', 'NET', 'ROST', 'ATVI', 'EA',
      //'ADSK', 'TEAM', 'OKTA', 'ZS', 'WDAY', 'CRWD', 'NOW', 'TWLO', 'DDOG', 'MELI'
    ]
      .map((symbol) => ({
        symbol,
        price: 0,
        //change: Number(),
        //changePercent: Number(),
      }))
  );
  const tickerContainerRef = useRef(null);

  //  Configure socket for receiving stock data
  const { sendMessage, lastMessage } = useWebSocket(
    `wss://ws.finnhub.io?token=${process.env.REACT_APP_FINNHUB_API_KEY}`,
    {
      onOpen: () => {
        tickerData.forEach((stock) => {
          sendMessage(JSON.stringify({ type: 'subscribe', symbol: stock.symbol}));
        });
      },
      onMessage: (message) => {
        console.log('Message:', message);
        const messageData = JSON.parse(message.data);
        setTickerData((prevTickerData) => {
          return prevTickerData.map((stock) => {
            if (stock.symbol === messageData.s) {
              return {
                ...stock,
                price: Number(messageData.p).toFixed(2),
                //change: Number((messageData.p - stock.price).toFixed(2)),
                //changePercent: Number(`${((messageData.p - stock.price) / stock.price * 100).toFixed(2)}%`),
              };
            }
            return stock;
          });
        });
      },
      onError: (error) => {
        console.error('WebSocket error:', error);
      },
      shouldReconnect: () => true,
    }
  );

  //  Update ticker data whenever a new message arrives
  useEffect(() => {
    if (lastMessage !== null) {
      console.log('Message:', lastMessage);
    }
  }, [lastMessage]);

  useEffect(() => {
    let animationFrameId;
    const container = tickerContainerRef.current;

    const scrollTick = () => {
      container.scrollLeft += 1;

      if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
        container.scrollLeft = 0;
      }
      animationFrameId = requestAnimationFrame(scrollTick);
    };

    animationFrameId = requestAnimationFrame(scrollTick);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  //  Render browser elements
  return (
    <div className="stock-ticker-container">
      <div ref={tickerContainerRef} className="stock-ticker bg-dark text-light p-1">
        {tickerData.concat(tickerData).map((stock, index) => (
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
