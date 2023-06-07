import React, { useEffect, useRef, useMemo } from 'react';
import { ArcElement, Chart, DoughnutController, Legend, Title } from 'chart.js';
import './Donut.css';

const Donut = () => {
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
    const renderChart = async () => {
      const donutChart = donutChartRef.current;

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const labels = ['AAPL', 'AMZN', 'GOOGL', 'META', 'MSFT'];
      const marketCaps = await fetchMarketCaps(labels);
      labels.push('OTHER');
      marketCaps.push(2185200);

      chartInstanceRef.current = new Chart(donutChart, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Big Five vs The World',
              data: marketCaps,
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
          plugins: {
            title: {
              display: true,
              text: 'Big Five vs The World',
              font: {
                size: 24,
                weight: 'bold',
              },
            },
            legend: {
              display: true,
              position: 'bottom',
              labels: {
                usePointStyle: true,
                padding: 18,
              },
            },
          },
        },
      });
    };

    Chart.register(ArcElement, DoughnutController, Legend, Title);
    renderChart();

  }, [backgroundColors, borderColors]);

  return (
    <div className="donut-chart-container">
      <canvas
        ref={donutChartRef}
        className="donut-chart"
        aria-label="donut chart"
        role="img">
      </canvas>
    </div>
  );
};

export default Donut;

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
}
