import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';
import 'Donut.css';

const Donut = () => {
  const donutChartRef = useRef(null);

  useEffect(() => {
    const backgroundColors = [
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
    ];

    const borderColors = [
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
    ];

    const renderChart = () => {
      const donutChart = donutChartRef.current;

      new Chart(donutChart, {
        type: 'doughnut',
        data: {
          labels: ['AAPL', 'AMZN', 'GOOGL', 'META', 'MSFT'],
          datasets: [
            {
              label: 'My First Dataset',
              data: [20, 12, 25, 11, 49],
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 1,
            },
          ],
        },
      });
    };

    renderChart();
  }, []);

  return (
    <canvas ref={donutChartRef} className="donut-chart" aria-label="donut chart" role="img"></canvas>
  );
};

export default Donut;
