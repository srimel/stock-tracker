import React, { useState, useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import './CandleStick.css';

const CandleStick = (props) => {
  const [timeFrame, setTimeFrame] = useState(7884000);
  const chartRef = useRef(null);
  const [invalidData, setInvalidData] = useState(false);

  useEffect(() => {
    function getCandleDataSeries(candleData, symbol) {
      if (
        !candleData ||
        !Array.isArray(candleData.t) ||
        !Array.isArray(candleData.o) ||
        !Array.isArray(candleData.h) ||
        !Array.isArray(candleData.l) ||
        !Array.isArray(candleData.c) ||
        candleData.t.length !== candleData.o.length ||
        candleData.t.length !== candleData.h.length ||
        candleData.t.length !== candleData.l.length ||
        candleData.t.length !== candleData.c.length
      ) {
        console.error(`Invalid candle data for symbol ${symbol}`);
        setInvalidData(true);
        return {
          name: symbol,
          data: [], // Return an empty data series for invalid candle data
        };
      }
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
      return {
        name: symbol,
        data: dataSeries,
      };
    }

    async function getStockData(symbol) {
      const finnhub = require('finnhub');
      const api_key = finnhub.ApiClient.instance.authentications['api_key'];
      api_key.apiKey = process.env.REACT_APP_FINNHUB_API_KEY;
      const finnhubClient = new finnhub.DefaultApi();

      const currentDate = Math.floor(Date.now() / 1000);
      const pastTime = currentDate - timeFrame;

      return new Promise((resolve, reject) => {
        finnhubClient.stockCandles(
          symbol,
          'D',
          pastTime,
          currentDate,
          (error, data, response) => {
            if (error) {
              reject(error);
            } else {
              resolve(data);
            }
          },
        );
      });
    }

    async function createCandleChart() {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      let symbol1Data;
      try {
        symbol1Data = await getStockData(props.symbol1);
      } catch (error) {
        symbol1Data = null;
      }

      let dataSeries = symbol1Data
        ? [getCandleDataSeries(symbol1Data, props.symbol1)]
        : [];

      let titleText = props.symbol1;
      if (props.symbol2) {
        let symbol2Data;
        try {
          symbol2Data = await getStockData(props.symbol2);
        } catch (error) {
          symbol2Data = null;
        }
        if (symbol2Data) {
          dataSeries.push(getCandleDataSeries(symbol2Data, props.symbol2));
          titleText = `${props.symbol1} vs ${props.symbol2}`;
        }
      }

      var options = {
        series: dataSeries,
        chart: {
          type: 'candlestick',
          height: 350,
        },
        title: {
          text: titleText,
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
          labels: {
            formatter: function (val) {
              return val !== undefined ? val.toFixed(2) : '';
            },
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

    createCandleChart();
  }, [props.symbol1, props.symbol2, timeFrame]);

  const chartID = `chart-${props.symbol1}`;

  return !invalidData ? (
    <div className="candlestick mb-5">
      <div id={chartID}></div>
      <div className="buttons-container">
        <ToggleButtonGroup type="radio" name="time-frame">
          <ToggleButton
            variant={timeFrame === 7884000 ? 'primary' : 'secondary'}
            value={7884000}
            onClick={() => setTimeFrame(7884000)}
          >
            3 Months
          </ToggleButton>
          <ToggleButton
            variant={timeFrame === 15768000 ? 'primary' : 'secondary'}
            value={15768000}
            onClick={() => setTimeFrame(15768000)}
          >
            6 Months
          </ToggleButton>
          <ToggleButton
            variant={timeFrame === 31536000 ? 'primary' : 'secondary'}
            value={31536000}
            onClick={() => setTimeFrame(31536000)}
          >
            1 Year
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  ) : null;
};

export default CandleStick;
