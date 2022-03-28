import React, { useState, useEffect } from 'react';
import Tabletop from 'tabletop';
import Papa from "papaparse";
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
} from "chart.js";
import { Bar } from "react-chartjs-2";
var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/10leb519G1WKGpNsImOoVDUJePoDy8QsY/edit#gid=100167475';

const red = "rgba(255, 99, 132, 0.5)";
const blue = "rgba(53, 162, 235, 0.5)";
const yellow = "rgba(245, 233, 66, 0.5)";
const green = "rgba(84, 245, 66, 0.5)";
function r(max) {
  return Math.floor(Math.random() * max);
}
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
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

export const options_line = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
function handleTimeGrade(item) {
  switch (item?.time) {
    case "01":
      item.time = "January";
      break;
    case "02":
      item.time = "February";
      break;
    case "03":
      item.time = "March";
      break;
    case "04":
      item.time = "April";
      break;
    case "05":
      item.time = "May";
      break;
    case "06":
      item.time = "June";
      break;
    case "07":
      item.time = "July";
      break;
    case "08":
      item.time = "August";
      break;
    case "09":
      item.time = "September";
      break;
    case "10":
      item.time = "October";
      break;
    case "11":
      item.time = "November";
      break;
    case "12":
      item.time = "December";
      break;
    default:
      console.log("Well nothing happened");
      break;
  }
}
 function showInfo(data, tabletop) {
  // do something with the data
  console.log(data);
  console.log(JSON.stringify(data, null, 2));
}
 
const EmoSheet = () => {
    const [data, setData] = useState([])
    const [count, setCount] = useState(0)

      useEffect(() => {
        Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vSR_anaes5n_YbQgWCLEhQYOJYiGCloz9fhb9Gnnf2ehqv7ItLmWpaFone2G0DgGg/pub?output=csv", {
          download: true,
          header: true,
          complete: (results) => {
            setData(results.data);
          },
        });
      }, [count])
      
      const temp = Array.from(data);
      var trimed = temp?.map(function(item){ item.time = item?.time?.slice(5,7); handleTimeGrade(item); return item})
      // var finalTrimed =  trimed.map(function(item){
      //   handleTimeGrade(item);
      //   return item;
      // }
      // )
      
  return (

    <div>
    {console.log(`the Trimed:`, trimed)}
    <h1>data from google sheets</h1>
    <button
          type="button"
          onClick={() => {
            setCount(r(100))
          }}
          className=" bg-black text-white font-bold p-2 rounded-full w-28 outline-none"
       > Render </button>
        <div></div>
    </div>
  )
}

export default EmoSheet