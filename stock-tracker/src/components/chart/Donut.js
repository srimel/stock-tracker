import React, { useEffect, useRef, useMemo } from 'react';
import { ArcElement, Chart, DoughnutController } from 'chart.js';
import './Donut.css';

const Donut = () => {
  const finnhub = require('finnhub');
  const api_key = finnhub.ApiClient.instance.authentications['api_key'];
  api_key.apiKey = process.env.REACT_APP_FINNHUB_API_KEY;
  //const finnhubClient = new finnhub.DefaultApi();

  const donutChartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const backgroundColors = useMemo(
    () => [
      'rgba(0, 123, 255, 0.8)',
      'rgba(255, 173, 51, 0.8)',
      'rgba(0, 216, 0, 0.8)',
      'rgba(255, 65, 54, 0.8)',
      'rgba(255, 51, 153, 0.8)',
      'rgba(51, 153, 255, 0.8)',
      'rgba(255, 102, 0, 0.8)',
      'rgba(102, 204, 0, 0.8)',
      'rgba(255, 0, 102, 0.8)',
      'rgba(255, 153, 0, 0.8)',
      'rgba(0, 204, 102, 0.8)',
    ],
    []
  );
  const borderColors = useMemo(
    () => [
      'rgba(0, 123, 255, 1)',
      'rgba(255, 173, 51, 1)',
      'rgba(0, 216, 0, 1)',
      'rgba(255, 65, 54, 1)',
      'rgba(255, 51, 153, 1)',
      'rgba(51, 153, 255, 1)',
      'rgba(255, 102, 0, 1)',
      'rgba(102, 204, 0, 1)',
      'rgba(255, 0, 102, 1)',
      'rgba(255, 153, 0, 1)',
      'rgba(0, 204, 102, 1)',
    ],
    []
  );

  useEffect(() => {
    const renderChart = () => {
      const donutChart = donutChartRef.current;

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      const labels = ['AAPL', 'AMZN', 'GOOGL', 'META', 'MSFT'];

      chartInstanceRef.current = new Chart(donutChart, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Big Five Tech Stocks',
              data: [20, 12, 25, 11, 49],
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 1,
        },
      });
    };

    Chart.register(ArcElement, DoughnutController);
    renderChart();

  }, [backgroundColors, borderColors]);

  return (
    <canvas ref={donutChartRef} className="donut-chart" aria-label="donut chart" role="img"></canvas>
  );
};

export default Donut;
