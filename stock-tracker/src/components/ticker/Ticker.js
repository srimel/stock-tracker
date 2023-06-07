import React, { useEffect, useState, useRef } from 'react';
import useWebSocket from 'react-use-websocket';
//import './ticker.css';

const Ticker = () => {
  const tickerContainerRef = useRef(null);
  const [tickerData, setTickerData] = useState(
    [
      'AAPL', 'FB', 'AMZN', 'NFLX', 'GOOGL', 'MSFT', 'NVDA', 'TSLA', 'INTC',
      'AMD', 'IBM', 'CRM', 'ORCL', 'ADBE', 'PYPL', 'TWTR', 'SQ', 'CRM', 'SNAP',
      'SHOP', 'UBER', 'ZM', 'DOCU', 'PTON', 'ROKU', 'NET', 'ROST', 'ATVI', 'EA',
      'ADSK', 'TEAM', 'OKTA', 'ZS', 'WDAY', 'CRWD', 'NOW', 'TWLO', 'DDOG', 'MELI'
    ]
      .map((symbol) => ({
        symbol,
        price: "000.00",
        change: "0.00",
        changePercent: "0.00",
      }))
  );
  //  Configure socket for receiving stock data
  const { sendMessage } = useWebSocket(
    `wss://ws.finnhub.io?token=${process.env.REACT_APP_FINNHUB_API_KEY}`,
    {
      onOpen: () => {
        tickerData.forEach((stock) => {
          sendMessage(JSON.stringify(
            { type: 'subscribe', symbol: stock.symbol}
          ));
        });
      },
      onMessage: (message) => {
        const messageData = JSON.parse(message.data);
        setTickerData((prevTickerData) => {
          return prevTickerData.map((stock) => {
            try {
              const match = messageData.data.find(
                (trade) => trade.s === stock.symbol);
              if (match) {
                const diff = match.p - stock.price;
                const changePercent = stock.price !== 0 ?
                  (diff / stock.price * 100).toFixed(2) : 0;
                return {
                  ...stock,
                  price: Number(match.p).toFixed(2),
                  change: Number(diff).toFixed(2),
                  changePercent: `${changePercent}%`,
                };
              }
            } catch (error) {
              // don't care
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

  //  Scroll ticker items to the left and repeat once end is reached
  useEffect(() => {
    let animationFrameId;
    const container = tickerContainerRef.current;

    const scrollTick = () => {
      container.scrollLeft += 1;
      if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
        container.scrollLeft = 600; // this should probably be relative
      }
      animationFrameId = requestAnimationFrame(scrollTick);
    };

    animationFrameId = requestAnimationFrame(scrollTick);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  //  Render browser elements
  return (
    <div className="stock-ticker-container">
      <div ref={tickerContainerRef}
        className="stock-ticker bg-dark text-light p-1">
        {tickerData.map((stock, index) => (
          <div key={index}
               className="stock-item d-inline-block">
            <span className="stock-symbol">
              {stock.symbol}
            </span>
            <span className="stock-price">
              {stock.price}
            </span>
            <div className="stock-change-wrapper d-flex justify-content-center">
              <div className={`stock-change ${stock.change < 0 ? 'negative' :
                               stock.change > 0 ? 'positive' : ''}`}>
                <span className={`arrow ${stock.change < 0 ? 'negative' : ''}`}>
                  {stock.change < 0 ? '\u25BC' :
                   stock.change > 0 ? '\u25B2' : ''}
                </span>
                <span className="stock-change-percent">
                  {stock.changePercent}
                </span>
                <span className="stock-change">
                  ({stock.change === 0 ? "0.00" : stock.change})
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
