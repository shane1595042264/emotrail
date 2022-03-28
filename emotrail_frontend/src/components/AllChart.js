import React, { useState, useEffect } from "react";
import Papa from "papaparse";

import * as XLSX from "xlsx";

import Tabletop from 'tabletop'
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

import { Pie } from "react-chartjs-2";
import { emotionNum } from "../utils/data";

import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { userQuery } from "../utils/data";
import { client } from "../client";
import Data from "./Data";
function r(max) {
  return Math.floor(Math.random() * max);
}

const red = "rgba(255, 99, 132, 0.5)";
const blue = "rgba(53, 162, 235, 0.5)";
const yellow = "rgba(245, 233, 66, 0.5)";
const green = "rgba(84, 245, 66, 0.5)";

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

function setData(currentGrade) {
  console.log("CurrentGrade: ", currentGrade);
  const data = {
    labels,
    datasets: [
      {
        label: "Angry/Annoyed",
        data: labels.map((month) => {
          let monthNum = 0;
          currentGrade?.map((i) => {
            if (i.time == month && i.emotion == "red") {
              monthNum++;
            }
          });
          console.log(monthNum);
          month = monthNum;
          return month;
        }),
        backgroundColor: red,
      },
      {
        label: "Sad/Bored",
        data: labels.map((month) => {
          let monthNum = 0;
          currentGrade?.map((i) => {
            if (i.time == month && i.emotion == "blue") {
              monthNum++;
            }
          });
          console.log(monthNum);
          month = monthNum;
          return month;
        }),
        backgroundColor: blue,
      },
      {
        label: "Happy/Excited",
        data: labels.map((month) => {
          let monthNum = 0;
          currentGrade?.map((i) => {
            if (i.time == month && i.emotion == "yellow") {
              monthNum++;
            }
          });
          console.log(monthNum);
          month = monthNum;
          return month;
        }),
        backgroundColor: yellow,
      },
      {
        label: "Relaxed/Satisfied",
        data: labels.map((month) => {
          let monthNum = 0;
          currentGrade?.map((i) => {
            if (i.time == month && i.emotion == "green") {
              monthNum++;
            }
          });
          console.log(monthNum);
          month = monthNum;
          return month;
        }),
        backgroundColor: green,
      },
    ],
  };
  return data;
}
export const data_line = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map((item) => (item = r(300))),
      borderColor: red,
      backgroundColor: red,
    },
    {
      label: "Dataset 2",
      data: labels.map((item) => (item = r(200))),
      borderColor: blue,
      backgroundColor: blue,
    },
    {
      label: "Dataset 3",
      data: labels.map((item) => (item = r(200))),
      borderColor: yellow,
      backgroundColor: yellow,
    },
    {
      label: "Dataset 4",
      data: labels.map((item) => (item = r(200))),
      borderColor: green,
      backgroundColor: green,
    },
  ],
};

var emotionNames = [
  "Happy/Excited",
  "Relaxed/Satisfied",
  "Sad/Bored",
  "Angry/Annoyed",
];
function setDataPie(currentGrade) {
  const data_pie = {
    labels: emotionNames,
    datasets: [
      {
        label: "Average emotion scores",
        data: emotionNames.map(function (item) {
          let emoNumber = 0;
          currentGrade.map((i)=>{
            if(i?.emotion == item){
              emoNumber++
            }
          })
          item = emoNumber;
          return item;
        }),
        backgroundColor: [red, blue, yellow, green],
        borderColor: [red, blue, yellow, green],
        borderWidth: 1,
      },
    ],
  };

  console.log("Data Pie data:", data_pie.datasets);
  return data_pie;
}

const AllChart = () => {
  const [currentGrade, setCurrentGrade] = useState([]);
  const [gradeInfo, setGradeInfo] = useState(" ");
  const [color, setColor] = useState("");
  // on change states
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);
  const [sheetData, setSheetData] = useState([])
  const [count, setCount] = useState(0)
  // submit
  const [excelData, setExcelData] = useState(null);
  // it will contain array of objects
  useEffect(() => {}, currentGrade);
  useEffect(() => {
    Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vSR_anaes5n_YbQgWCLEhQYOJYiGCloz9fhb9Gnnf2ehqv7ItLmWpaFone2G0DgGg/pub?output=csv", {
      download: true,
      header: true,
      complete: (results) => {
        setSheetData(results.data);
      },
    });
  }, [count])
  
  var temp = Array.from(sheetData);
console.log("temp:", temp);
  function handleTimeGrade(item) {
    switch (item?.time?.slice(5, 7)) {
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
    return item;
  }


  // var Freshman = excelData
  //   ?.map((i) => handleTimeGrade(i))
  //   ?.filter((i) => i?.grade == 9);
  // var Sophomore = excelData
  //   ?.map((i) => handleTimeGrade(i))
  //   ?.filter((i) => i?.grade == 10);
  // var Junior = excelData
  //   ?.map((i) => handleTimeGrade(i))
  //   ?.filter((i) => i?.grade == 11);
  // var Senior = excelData
  //   ?.map((i) => handleTimeGrade(i))
  //   ?.filter((i) => i?.grade == 12);
  var Freshman = temp
    ?.map((i) => handleTimeGrade(i))
    ?.filter((i) => i?.grade == 9);
  var Sophomore = temp
    ?.map((i) => handleTimeGrade(i))
    ?.filter((i) => i?.grade == 10);
  var Junior = temp
    ?.map((i) => handleTimeGrade(i))
    ?.filter((i) => i?.grade == 11);
  var Senior = temp
    ?.map((i) => handleTimeGrade(i))
    ?.filter((i) => i?.grade == 12);

  // var grades = [Freshman, Sophomore, Junior, Senior];

  const fileType = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    console.log(selectedFile.type);
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFileError(null);
          setExcelFile(e.target.result);
        };
      } else {
        setExcelFileError("Please select only excel file types");
        setExcelFile(null);
      }
    } else {
      console.log("plz select your file");
    }
  };

  // submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
    } else {
      setExcelData(null);
    }
  };
  return (
    <div>
    {/* <button
          type="button"
          onClick={() => {
            setCount(r(100))
          }}
          className=" bg-black text-white font-bold p-2 rounded-full w-28 outline-none"
       > Render </button> */}


      <div className=" flex justify-center items-center mt-5 p-5">
        <button
          type="button"
          onClick={() => {
            setCurrentGrade(Freshman);
            setGradeInfo("Freshman");
            setColor("text-yellow-500");
          }}
          className=" bg-yellow-500 text-white font-bold p-2 rounded-full w-28 outline-none"
        >
          Freshman
        </button>
        <button
          type="button"
          onClick={() => {
            setCurrentGrade(Sophomore);
            setGradeInfo("Sophomore");
            setColor("text-green-500");
          }}
          className=" bg-green-500 text-white font-bold p-2 rounded-full w-28 outline-none"
        >
          Sophomore
        </button>
        <button
          type="button"
          onClick={() => {
            setCurrentGrade(Junior);
            setGradeInfo("Junior");
            setColor("text-blue-500");
          }}
          className=" bg-blue-500 text-white font-bold p-2 rounded-full w-28 outline-none"
        >
          Junior
        </button>
        <button
          type="button"
          onClick={() => {
            setCurrentGrade(Senior);
            setGradeInfo("Senior");
            setColor("text-red-500");
          }}
          className=" bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
        >
          Senior
        </button>
      </div>
      <div className="flex justify-center items-center text-lg">
        <p className={color}>Current grade: {gradeInfo && gradeInfo} </p>
      </div>
      <div className="flex items-center justify-center">
        {/* upload file section */}
        <div className="flex justify-center items-center">
          <form className="mt-30" autoComplete="off" onSubmit={handleSubmit}>
            <label className="block items-center space-x-6">
              <h5>Upload Excel file</h5>
            </label>
            <br></br>

            <input
              type="file"
              className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100"
              onChange={handleFile}
              required
            ></input>

            {excelFileError && (
              <div className=" text-red-400">{excelFileError}</div>
            )}

            <button
              type="submit"
              className=" fill-blue-700 rounded-full to-blue-500"
            >
              Submit
            </button>
          </form>
        </div>

        <br></br>
        <hr></hr>

        {/* view file section */}
        <h5>View Excel file</h5>
        <div className="flex justify-center items-center h-auto overflow-hidden p-15">
          {excelData === null && <>No file selected</>}
          {excelData !== null && (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">round</th>
                    <th scope="col">grade</th>
                    <th scope="col">emotion</th>
                    <th scope="col">time</th>
                  </tr>
                </thead>
                <tbody>
                  <Data excelData={excelData} />
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Bar options={options} data={setData(currentGrade)} />
      <Line options={options_line} data={setData(currentGrade)} />
      {/* <Pie data={setDataPie(currentGrade)} /> */}

    </div>
  );
};

export default AllChart;
