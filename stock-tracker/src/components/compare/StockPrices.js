import React, { useState, useEffect } from 'react';
import CandleStick from '../chart/CandleStick';

const StockPrices = () => {
  const [symbol1, setSymbol1] = useState('');
  const [symbol2, setSymbol2] = useState('');
  const [currentPrice1, setCurrentPrice1] = useState(null);
  const [currentPrice2, setCurrentPrice2] = useState(null);
  const [change1, setChange1] = useState(null);
  const [change2, setChange2] = useState(null);
  const [companyName1, setCompanyName1] = useState('');
  const [companyName2, setCompanyName2] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [recommendation1, setRecommendation1] = useState({});
  const [recommendation2, setRecommendation2] = useState({});
  const [percentChange1, setPercentChange1] = useState(null);
  const [percentChange2, setPercentChange2] = useState(null);

  const handleSymbolChange = (event, symbolNumber) => {
    const symbol = event.target.value;
    if (symbolNumber === 1) {
      setSymbol1(symbol);
    } else if (symbolNumber === 2) {
      setSymbol2(symbol);
    }
  };

  const fetchStockPrice = async () => {
    if (!symbol1 || !symbol2) {
      setErrorMessage('Please enter two valid stock symbols for comparison');
      return;
    }

    try {
      setErrorMessage('');

      const response1 = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol1}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`
      );
      const data1 = await response1.json();
      setCurrentPrice1(data1.c);
      setChange1(data1.d);
      setPercentChange1(data1.dp);

      const companyResponse1 = await fetch(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol1}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`
      );
      const companyData1 = await companyResponse1.json();
      setCompanyName1(companyData1.name);

      const response2 = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol2}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`
      );
      const data2 = await response2.json();
      setCurrentPrice2(data2.c);
      setChange2(data2.d);
      setPercentChange2(data2.dp);

      const companyResponse2 = await fetch(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol2}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`
      );
      const companyData2 = await companyResponse2.json();
      setCompanyName2(companyData2.name);

      const recommendationResponse1 = await fetch(
        `https://finnhub.io/api/v1/stock/recommendation?symbol=${symbol1}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`
      );
      const recommendationData1 = await recommendationResponse1.json();
      setRecommendation1(recommendationData1[0]);

      const recommendationResponse2 = await fetch(
        `https://finnhub.io/api/v1/stock/recommendation?symbol=${symbol2}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`
      );
      const recommendationData2 = await recommendationResponse2.json();
      setRecommendation2(recommendationData2[0]);
    } catch (error) {
      console.error('Error fetching stock price:', error);
    }
  };

  useEffect(() => {
    fetchStockPrice();
  }, []);

  return (
    <div>
      <div  className="d-flex justify-content-center" >
      <h1>Stock Comparison</h1>
      </div>
      <div className="d-flex justify-content-center">
        <input
          type="text"
          value={symbol1}
          onChange={(event) => handleSymbolChange(event, 1)}
          placeholder="Enter stock symbol 1"
        />
        <input
          type="text"
          value={symbol2}
          onChange={(event) => handleSymbolChange(event, 2)}
          placeholder="Enter stock symbol 2"
        />
        <button onClick={fetchStockPrice}>COMPARE</button>
      </div>
      <div className="d-flex justify-content-center">
      {errorMessage && <p>{errorMessage}</p>}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '40px',
            border: '1px solid black',
            backgroundColor: 'lightblue',
          }}
        >
          {currentPrice1 && (
            <div>
              <h2 style={{ marginLeft: '5px', marginRight: '5px' }}>{companyName1}</h2>
              <p>Symbol: {symbol1}</p>
              <p>Current Share Price: {currentPrice1}</p>
              <p>Change: {change1}</p>
              <p>Percent Change: {percentChange1}</p>
              <h2 style = {{marginRight: '5px', marginLeft:'5px'}}>Recommended Trends</h2>
              <p>Buy: {recommendation1.buy}</p>
            <p>Sell: {recommendation1.sell}</p>
            <p>Hold: {recommendation1.hold}</p>
            <p>Period: {recommendation1.period}</p>
            <CandleStick symbol1= {symbol1} />
            </div>
          )}
        </div>
        <div
          style={{
            marginRight: 'auto',
            marginLeft:'auto',
            marginTop: '40px',
            border: '1px solid black',
            backgroundColor: 'lightgreen',
          }}
        >
          {currentPrice2 && (
            <div>
              <h2 style={{ marginLeft: '5px', marginRight: '5px' }}>{companyName2}</h2>
              <p>Symbol: {symbol2}</p>
              <p>Current Share Price: {currentPrice2}</p>
              <p>Change: {change2}</p>
              <p>Percent Change: {percentChange2}</p>
              <h2 style = {{marginRight: '5px', marginLeft:'5px'}}>Recommended Trends</h2>
              <p>Buy: {recommendation2.buy}</p>
            <p>Sell: {recommendation2.sell}</p>
            <p>Hold: {recommendation2.hold}</p>
            <p>Period: {recommendation2.period}</p>
            <CandleStick symbol1= {symbol2} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockPrices;