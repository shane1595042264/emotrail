
import React, {useState, useEffect} from 'react'

import * as XLSX from 'xlsx'

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
import {emotionNum} from '../utils/data'

import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import {userQuery} from '../utils/data';
import {client} from '../client';
import Data from './Data'
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
        label: 'Angry/Annoyed',
        data: labels.map((item) => item = emotionNum('Angry/Annoyed')),
        backgroundColor: red,
      },
      {
        label: 'Sad/Bored',
        data: labels.map((item ) => item = r(200)),
        backgroundColor: blue,
      },
      {
        label: 'Happy/Excited',
        data: labels.map((item ) => item = emotionNum('Happy/Excited')),
        backgroundColor: yellow,
      },
      {
        label: 'Relaxed/Satisfied',
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
  const [emoCount, setEmoCount] = useState(0)
  
  // on change states
  const [excelFile, setExcelFile]=useState(null);
  const [excelFileError, setExcelFileError]=useState(null);  
 
  // submit
  const [excelData, setExcelData]=useState(null);
  // it will contain array of objects
  useEffect(() => {
  const count = emotionNum()
  }, [])
  
  const fileType=['application/vnd.ms-excel'];
  const handleFile = (e)=>{
    let selectedFile = e.target.files[0];
    if(selectedFile){
      // console.log(selectedFile.type);
      if(selectedFile&&fileType.includes(selectedFile.type)){
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload=(e)=>{
          setExcelFileError(null);
          setExcelFile(e.target.result);
        } 
      }
      else{
        setExcelFileError('Please select only excel file types');
        setExcelFile(null);
      }
    }
    else{
      console.log('plz select your file');
    }
  }

  // submit function
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(excelFile!==null){
      const workbook = XLSX.read(excelFile,{type:'buffer'});
      const worksheetName = workbook.SheetNames[0];
      const worksheet=workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
    }
    else{
      setExcelData(null);
    }
  }
  return  <div>
      <div className="flex items-center justify-center">

{/* upload file section */}
<div className='flex justify-center items-center'>
  <form className='mt-30' autoComplete="off"
  onSubmit={handleSubmit}>
    <label className='block items-center space-x-6'><h5>Upload Excel file</h5></label>
    <br></br>

    <input type='file' className='block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100'
    onChange={handleFile} required></input>   

    {excelFileError&&<div className=' text-red-400'>{excelFileError}</div>}

    <button type='submit' className=' fill-blue-700 rounded-full to-blue-500'
    >Submit</button>
  </form>
</div>

<br></br>
<hr></hr>

{/* view file section */}
<h5>View Excel file</h5>
<div className='flex justify-center items-center h-auto overflow-hidden p-15'>
  {excelData===null&&<>No file selected</>}
  {excelData!==null&&(
    <div className='table-responsive'>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>round</th>
            <th scope='col'>grade</th>
            <th scope='col'>emotion</th>
            <th scope='col'>time</th>           
          </tr>
        </thead>
        <tbody>
          <Data excelData={excelData}/>
        </tbody>
      </table>            
    </div>
  )}       
</div>

</div>
 <Bar options={options} data={data} />
    <Line options={options_line} data={data_line} />
    <Pie  data={data_pie} />
  </div>
  
};

export default AllChart;
