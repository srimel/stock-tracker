import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
//import { Chart, registerables,CategoryScale, LinearScale, BarElement, Title, Tooltip  } from 'chart.js/auto';
//Chart.register(...registerables);


    const StockSectorMap = () => {
        const [sectorData, setSectorData] = useState(null);
        const [error, setError] = useState(null);
      
        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await axios.get(
                `https://finnhub.io/api/v1/stock/market/sector-performance?token=chn4661r01qsjpubcga0chn4661r01qsjpubcgag`
              );
              if (response.data && Array.isArray(response.data)) {
                setSectorData(response.data);
              } else {
                setError('Invalid response format');
              }
            } catch (error) {
              setError('Error fetching sector data');
            }
          };
      
          fetchData();
        }, []);
      
        if (error) {
          return <div>Error: {error}</div>;
        }
      
        if (!sectorData) {
          return <div>Loading...</div>;
        }
      
        const sectors = sectorData.map((sector) => sector.sector);
        const gains = sectorData.map((sector) => (sector.changesPercentage > 0 ? sector.changesPercentage : 0));
        const losses = sectorData.map((sector) => (sector.changesPercentage < 0 ? sector.changesPercentage : 0));
      
        const data = {
          labels: sectors,
          datasets: [
            {
              label: 'Gains',
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              data: gains,
            },
            {
              label: 'Losses',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
              data: losses,
            },
          ],
        };
      
        const options = {
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                drawBorder: false,
                color: (context) => {
                  if (context.tick.value < 0) {
                    return 'rgba(255, 99, 132, 0.5)';
                  }
                  return 'rgba(75, 192, 192, 0.5)';
                },
              },
              ticks: {
                callback: (value) => `${value}%`,
              },
            },
          },
        };
      
        return (
          <div>
            <h1>Stock Sector Map</h1>
            <Bar data={data} options={options} />
          </div>
        );
      };
      
      export default StockSectorMap;