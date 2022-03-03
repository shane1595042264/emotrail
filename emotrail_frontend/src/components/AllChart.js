
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

  function setData (currentGrade){ 
    console.log("CurrentGrade: ", currentGrade);
    const data = {
    labels,
    datasets: [
      {
        label: 'Angry/Annoyed',
        data: labels.map((month)=>{
          let monthNum = 0;
          currentGrade?.map((i)=>{
            if(i.time === month){
              monthNum ++;
            }
          })
          month = 2
          }),
        backgroundColor: red,
      },
      {
        label: 'Sad/Bored',
        data: labels.map((item) => item = r(5)),
        backgroundColor: blue,
      },
      {
        label: 'Happy/Excited',
        data: labels.map((item ) => item = r(5)),
        backgroundColor: yellow,
      },
      {
        label: 'Relaxed/Satisfied',
        data: labels.map((item ) => item = r(5)),
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
 const [currentGrade, setCurrentGrade] = useState([])
  // on change states
  const [excelFile, setExcelFile]=useState(null);
  const [excelFileError, setExcelFileError]=useState(null);  
 
  // submit
  const [excelData, setExcelData]=useState(null);
  // it will contain array of objects

  function handleTimeGrade(item){
    switch(item?.time?.slice(5,7)) {
      case '01':
        item.time = "January"
        break;
      case '02':
        item.time = "February"
        break;
      case '03':
        item.time = "March"
        break;
      case '04':
        item.time = "April"
        break;
      case '05':
        item.time = "May"
        break;
      case '06':
        item.time = "June"
        break;
      case '07':
        item.time = "July"
        break;
      case '08':
        item.time = "August"
        break;
      case '09':
        item.time = "September"
        break;
      case '10':
        item.time = "October"
        break;
      case '11':
        item.time = "November"
        break;
      case '12':
        item.time = "December"
        break;
      default:
        return;
    }
  }
  console.log("ExcelData: ", excelData);
  var FreshmanTime = excelData?.map(({i})=>handleTimeGrade({i}))
  var Freshman = FreshmanTime?.filter((i)=> i?.grade == 9)
  var Sophomore = excelData?.map((i)=>handleTimeGrade(i))?.filter((i)=> i?.grade == 10)
  var Junior = excelData?.map((i)=>handleTimeGrade(i))?.filter((i)=> i?.grade == 11)
  var Senior = excelData?.map((i)=>handleTimeGrade(i))?.filter((i)=> i?.grade == 12)
  console.log("FreshmanTime: ", FreshmanTime);
  console.log("ExcelDataAfterHandleTime: ", excelData);
  console.log("Freshman: ", Freshman);

  var FreshmanEmo = Freshman?.map((i)=> i.emotion)
  var SophomoreEmo = Sophomore?.map((i)=> i.emotion)
  var JuniorEmo = Junior?.map((i)=> i.emotion)
  var SeniorEmo = Senior?.map((i)=> i.emotion)
  // console.log(FreshmanEmo);
  useEffect(() => {
  const count = emotionNum()
  }, [])
  
  const handleEmo = (gradeGroup)=>{
    var yellow = 0;
    var green = 0;
    var blue = 0;
    var red = 0;
    gradeGroup.forEach(function(item){
      switch(item) {
        case 'yellow':
          yellow++
          break;
        case 'green':
          green++
          break;
        case 'blue':
          blue++
          break;
        case 'red':
          red++
          break;
        default:
          return;
      }
    })
    var handledEmo = [yellow, green, blue, red];
    return handledEmo;
  }
  const fileType=['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
  const handleFile = (e)=>{
    let selectedFile = e.target.files[0];
    console.log(selectedFile.type);
    if(selectedFile){
      
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
  <div className=' flex justify-center items-center mt-5 p-5'>
          
          <button
   type='button'
   onClick={()=>setCurrentGrade(Freshman)}
   className=' bg-yellow-500 text-white font-bold p-2 rounded-full w-28 outline-none'>
    Freshman
   </button>
          <button
   type='button'
   onClick={()=>setCurrentGrade(Sophomore)}
   className=' bg-green-500 text-white font-bold p-2 rounded-full w-28 outline-none'>
    Sophomore
   </button>
          <button
   type='button'
   onClick={()=>setCurrentGrade(Junior)}
   className=' bg-blue-500 text-white font-bold p-2 rounded-full w-28 outline-none'>
    Junior
   </button>
          <button
   type='button'
   onClick={()=>setCurrentGrade(Senior)}
   className=' bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none'>
    Senior
   </button>
</div>
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
 <Bar options={options} data={setData(currentGrade)} />
    <Line options={options_line} data={data_line} />
    <Pie  data={data_pie} />
  </div>
  
};

export default AllChart;
