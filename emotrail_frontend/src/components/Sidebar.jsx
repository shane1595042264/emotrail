import React, {useState, useEffect} from 'react'
import {NavLink, Link} from 'react-router-dom';
import {RiHomeFill} from 'react-icons/ri';
import {IoIosArrowsForwar} from 'react-icons/io';
import {AiFillPieChart} from 'react-icons/ai';
import logo from '../assets/logo3.png';
import {categories} from '../utils/data';
import { useFetch } from "react-async";
import { client } from '../client';
import {permissionQuery} from '../utils/data';


const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize';


const Sidebar = ({user, closeToggle}) => {
    const [chart, setChart] = useState(false)
    const [permissionID, setPermissionID] = useState('Nothing')
    const fetchPermission = ()=>{
        let query = permissionQuery();
        if(query){
          client.fetch(query)
          .then((data)=>{
            console.log("permissionToView:", data[0].permission);
            setChart(data[0].permission)
            setPermissionID(data[0]._id)
            console.log('the ID for the permission is, ', permissionID);
          })
        }
    }
    const handleCloseSidebar = () => {
        if(closeToggle) closeToggle(false)
    }
    const handleChart = ()=>{
        if(chart){setChart(false)}
        else{
            setChart(true)
        }

        client.patch(permissionID)
        .set({permission: chart})
        .commit()
        .then((e)=>{
            console.log('Chart permission successfully changed to', chart);
        })
        .catch((err)=>{
            console.log('chart change failed', err.message);
        })
    }
    
useEffect(() => {
    fetchPermission();
}, [])

    return (
        <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
        
            <div className="flex flex-col">
                <Link
                   to="/"
                   className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
                   onClick={handleCloseSidebar}
                    >
                <img src={logo} alt="logo" className=" w-full"/>
                </Link>
               
                {/* Toggle Chart */}
                        {(user?.admin ) && <button
          type='button'
          className=' flex bottom-3 left-3 p-3 rounded-full bg-green-600 text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out'
          onClick={()=>{handleChart(); console.log(`Now the chart status is ${chart}`);}}
          >
                <AiFillPieChart fontSize={30} className='cursor-pointer w-full'/>
                Click to Toggle chart.
          </button> }
          <p>The chart is now: {chart ? "unavailable": "available"}</p>
                   {(user?.admin ||chart) && <button
          type='button'
          className=' absolute bottom-3 right-3 p-3 rounded-full bg-red-600 text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out'
          onClick={()=>{console.log('yes');  console.log(!!user.admin);}}
          >

                {true && <Link
                   to="/chart"
                   className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
                    >
                <AiFillPieChart fontSize={30} className='cursor-pointer w-full'/>
                Click to view Chart
                </Link>}


          </button> }
                <div className="flex flex-col gap-5">
                <NavLink
                to="/"
                className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle}
                onClick={handleCloseSidebar}
                >
                <RiHomeFill/> 
                {/* react icon */}
                Home
                </NavLink>
                <h3 className='mt-2 px-5 text-base 2xl:text-xl'>Discover categories</h3>
                {categories.slice(0, categories.length-1).map((category)=>(
                    <NavLink
                      to={`/category/${category.name}`}
                    className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle}
                     onClick={handleCloseSidebar}
                     key={category.name}
                    >
                <img src={category.image} className=' w-8 h-8 rounded-full shadow-sm' alt="category"/>
                  {category.name}
                    </NavLink>
                ))}
                {/* we don't want other to be a category */}
                </div>
            </div>

            {/* User Profile */}
            {user && (
                
                <Link
                to={`/user-profile/${user.id}`}
                className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
                // margin in tailwindcss
                onClick={handleCloseSidebar}
                >
                <img src={user?.image} className="w-10 h-10 rounded-full" alt="user-profile" />
                <p>
                    {user.userName}
                </p>
                </Link>
                
            )}
            
        </div>
        

    );
};

export default Sidebar;
