import React, { useEffect, useRef, useMemo } from 'react';
import { ArcElement, Chart, DoughnutController, Legend, Title } from 'chart.js';
import './Donut.css';

//const totalTechMarketCap = 21852000;

const Donut = ({title, labels, dataset}) => {
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

      chartInstanceRef.current = new Chart(donutChart, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [
            {
              label: title,
              data: dataset,
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
              text: title,
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
                padding: 30,
              },
            },
          },
        },
      });
    };

    Chart.register(ArcElement, DoughnutController, Legend, Title);
    renderChart();

  }, [title, labels, dataset, backgroundColors, borderColors]);

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
