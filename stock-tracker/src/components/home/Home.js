import React, { useState, useEffect, useMemo } from 'react';
import './Home.css';
import CandleStick from '../chart/CandleStick';
import Details from '../details/Details';
import Donut from '../chart/Donut';

function Home() {
  const [marketCaps, setMarketCaps] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [openPrices, setopenPrices] = useState([]);
  const bigFive = useMemo(
    () => ['AAPL', 'AMZN', 'GOOGL', 'META', 'MSFT'], []
  );

  useEffect(() => {
    const fetchData = async () => {
      const marketCaps = await fetchMarketCaps(bigFive);
      const openPrices = await fetchOpenPrices(bigFive);
      setMarketCaps(marketCaps);
      setopenPrices(openPrices);
    };
    fetchData()
  }, [bigFive]);

  return (
    <div className="home">
      {<Details />}
      {<div className="chart-container">
        <CandleStick symbol1="AAPL" />
        <CandleStick symbol1="AMZN" />
        <CandleStick symbol1="GOOGL" />
        <CandleStick symbol1="META" />
        <CandleStick symbol1="MSFT" />

      </div>}
      {<div className='donut-container'>
        <Donut title={"Market Cap"} labels={bigFive} dataset={marketCaps}/>
        <Donut title={"Come Up With Another Dataset"} labels={bigFive} dataset={marketCaps}/>
        <Donut title={"Opening Share Prices"} labels={bigFive} dataset={openPrices}/>
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


async function fetchOpenPrices(symbols) {
  try {
    const finnhub = require('finnhub');
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = process.env.REACT_APP_FINNHUB_API_KEY;
    const finnhubClient = new finnhub.DefaultApi();

    const openPrices = await Promise.all(
      symbols.map((symbol) => {
        return new Promise((resolve, reject) => {
          finnhubClient.quote(symbol, (error, data) => {
            if (error) {
              console.error(error);
              reject(error);
            } else {
              resolve(data['o']);
            }
          });
        });
      })
    );

    // Process the openPrices array
    openPrices.forEach((openPrice, index) => {
      console.log(`${symbols[index]} open price: ${openPrice}`);
    });

    return openPrices;
  } catch (error) {
    console.error(error);
  }
}
       