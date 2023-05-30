import React from 'react';
import ApexCharts from 'apexcharts';
import './CandleStick.css';

const CandleStick = (props) => {
  React.useEffect(() => {
    function getCandleDataSeries(candleData) {
      const len = candleData.t.length;
      let dataSeries = [];
      for (let i = 0; i < len; i++) {
        dataSeries.push({
          x: new Date(candleData.t[i] * 1000),
          y: [
            candleData.o[i],
            candleData.h[i],
            candleData.l[i],
            candleData.c[i],
          ],
        });
      }
      return dataSeries;
    }

    // TODO: default to 1 year from current date timeframe
    function getStockData(stock) {
      const finnhub = require('finnhub');
      const api_key = finnhub.ApiClient.instance.authentications['api_key'];
      api_key.apiKey = process.env.REACT_APP_FINNHUB_API_KEY;
      const finnhubClient = new finnhub.DefaultApi();

      const currentDate = Math.floor(Date.now() / 1000);
      const threeMonthsAgo = currentDate - 7884000;
      const oneYearAgo = currentDate - 31536000;

      // TODO: add option to change timeframe
      //  currently defaults to three months back from current date.
      finnhubClient.stockCandles(
        props.symbol1,
        'D',
        threeMonthsAgo,
        currentDate,
        (error, data, response) => {
          if (error) {
            console.error(error);
          } else {
            console.log(data);
            createCandleChart(data, stock);
          }
        },
      );
    }

    function createCandleChart(data, symbol) {
      const dataSeries = getCandleDataSeries(data);
      console.log(`${props.symbol1} candlestick chart`, dataSeries);

      var options = {
        series: [
          {
            data: dataSeries,
          },
        ],
        chart: {
          type: 'candlestick',
          height: 350,
        },
        title: {
          text: `${props.symbol1}`,
          align: 'center',
        },
        xaxis: {
          type: 'datetime',
          labels: {
            show: false,
          },
        },
        yaxis: {
          tooltip: {
            enabled: true,
          },
        },
      };

      const chartID = `chart-${props.symbol1}`;
      const chart = new ApexCharts(
        document.querySelector(`#${chartID}`),
        options,
      );
      chart.render();
    }
    getStockData(props.symbol1);
  }, [props.symbol1]);

  const chartID = `chart-${props.symbol1}`;

  return (
    <div className="candlestick">
      <div id={chartID}></div>
    </div>
  );
};

export default CandleStick;
