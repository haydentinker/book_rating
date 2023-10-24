import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
    },
  };
  const labels=["1","2","3","4","5"]

  export function BarChart(data){
    const chartData = {
        labels: labels,
        datasets: [
            {
            label:"Reviews",
            data:data.data,
            backgroundColor:'rgba(255,99,132,0.5)'
        }
        ]
      };
    return <Bar options={options} data={chartData}/>
  }