import React, { useState, useEffect, useMemo } from 'react';
import './Home.css';
import CandleStick from '../chart/CandleStick';
import Details from '../details/Details';
import Donut from '../chart/Donut';
import '../chart/Donut.css';

// Per wireframe:
// Home page will contain a search input for bringing up the stock details modal.
// Home page will contain three candlestick charts for common stocks?. Composite indices are premium finnhub features.
// Home page will coantain a sector map or some other chart thing.

function Home() {
  const [marketCaps, setMarketCaps] = useState([]);
  const bigFive = useMemo(
    () => ['AAPL', 'AMZN', 'GOOGL', 'META', 'MSFT'], []
  );

  useEffect(() => {
    const fetchData = async () => {
      const marketCaps = await fetchMarketCaps(bigFive);
      setMarketCaps(marketCaps);
    };
    fetchData()
  }, [bigFive]);

  return (
    <div className="home">
      {<Details />}
      {<div className="chart-container">
        <CandleStick symbol1="AAPL" />
        <CandleStick symbol1="TSLA" />
        <CandleStick symbol1="AMZN" />
      </div>}
      {<div className='donut-container'>
        <Donut title={"Big Five Market Cap"} labels={bigFive} dataset={marketCaps}/>
        <Donut title={"Come Up With Another Dataset"} labels={bigFive} dataset={marketCaps}/>
        <Donut title={"Come Up With Another Dataset"} labels={bigFive} dataset={marketCaps}/>
      </div>}
    </div>
  );
}

export default Home;

async function fetchMarketCaps(symbols) {
  try {
    const finnhub = require('finnhub');
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = process.env.REACT_APP_FINNHUB_API_KEY;
    const finnhubClient = new finnhub.DefaultApi();

    const marketCaps = await Promise.all(
      symbols.map((symbol) => {
        return new Promise((resolve, reject) => {
          finnhubClient.companyProfile2({ symbol }, (error, data) => {
            if (error) {
              console.error(error);
              reject(error);
            } else {
              resolve(data['marketCapitalization']);
            }
          });
        });
      })
    );

    // Process the marketCaps array
    marketCaps.forEach((marketCap, index) => {
      console.log(`${symbols[index]} market cap: ${parseInt(marketCap)}`);
    });
    return marketCaps;
  } catch (error) {
    console.error(error);
  }
};

