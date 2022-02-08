import React from 'react';

import {
    Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  } from 'chart.js';

import { Pie } from 'react-chartjs-2';


import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';

function r(max) {
  return Math.floor(Math.random() * max);
}

const red = 'rgba(255, 99, 132, 0.5)'
const blue ='rgba(53, 162, 235, 0.5)'
const yellow = 'rgba(245, 233, 66, 0.5)'
const green = 'rgba(84, 245, 66, 0.5)'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );
export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };
export const options_line = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  export const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map((item) => item = r(200)),
        backgroundColor: red,
      },
      {
        label: 'Dataset 2',
        data: labels.map((item ) => item = r(200)),
        backgroundColor: blue,
      },
      {
        label: 'Dataset 3',
        data: labels.map((item ) => item = r(200)),
        backgroundColor: yellow,
      },
      {
        label: 'Dataset 4',
        data: labels.map((item ) => item = r(200)),
        backgroundColor: green,
      },
    ],
  };
  export const data_line = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map((item) => item = r(300)),
        borderColor: red,
        backgroundColor: red,
      },
      {
        label: 'Dataset 2',
        data: labels.map((item) =>  item = r(200)),
        borderColor: blue,
        backgroundColor: blue,
      },
      {
        label: 'Dataset 3',
        data: labels.map((item) =>  item = r(200)),
        borderColor: yellow,
        backgroundColor: yellow,
      },
      {
        label: 'Dataset 4',
        data: labels.map((item) =>  item = r(200)),
        borderColor: green,
        backgroundColor: green,
      },
    ],
  };
  const grades= ['Freshman', 'Sophomore', 'Junior', 'Senior']
  export const data_pie = {
    labels: ['Freshman', 'Sophomore', 'Junior', 'Senior'],
    datasets: [
      {

        label: 'Average emotion scores',
        data: grades.map((item) => item = r(200)),
        backgroundColor: [
          red, blue, yellow, green
        ],
        borderColor: [
          red, blue, yellow, green
        ],
        borderWidth: 1,
      },
    ],
  };
const AllChart = () => {
  return <div>
    
    <Bar options={options} data={data} />
    <Line options={options_line} data={data_line} />
    <Pie  data={data_pie} />
  </div>;
};

export default AllChart;
