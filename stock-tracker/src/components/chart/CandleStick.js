import React, { useState, useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';
import './CandleStick.css';

const CandleStick = (props) => {
  const [timeFrame, setTimeFrame] = useState(7884000);
  const chartRef = useRef(null);

  useEffect(() => {
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

    function getStockData(stock) {
      const finnhub = require('finnhub');
      const api_key = finnhub.ApiClient.instance.authentications['api_key'];
      api_key.apiKey = process.env.REACT_APP_FINNHUB_API_KEY;
      const finnhubClient = new finnhub.DefaultApi();

      const currentDate = Math.floor(Date.now() / 1000);
      const pastTime = currentDate - timeFrame;

      finnhubClient.stockCandles(
        props.symbol1,
        'D',
        pastTime,
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
      if (chartRef.current) {
        chartRef.current.destroy();
      }

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
      const newChart = new ApexCharts(
        document.querySelector(`#${chartID}`),
        options,
      );
      newChart.render();
      chartRef.current = newChart;
    }
    getStockData(props.symbol1);
  }, [props.symbol1, timeFrame]);

  const chartID = `chart-${props.symbol1}`;

  return (
    <div className="candlestick">
      <div id={chartID}></div>
      <div>
        <button onClick={() => setTimeFrame(7884000)}>3 Months</button>
        <button onClick={() => setTimeFrame(15768000)}>6 Months</button>
        <button onClick={() => setTimeFrame(31536000)}>1 Year</button>
      </div>
    </div>
  );
};

export default CandleStick;
