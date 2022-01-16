import React, {useState, useRef, useEffect} from 'react'
import {HiMenu} from 'react-icons/hi';
import {AiFillCloseCircle} from 'react-icons/ai';
import {Link, Route, Routes} from 'react-router-dom';
import {userQuery} from '../utils/data';
import {Sidebar, UserProfile} from '../components';
import Pins from './Pins';
import {client} from '../client';
import logo from '../assets/logo3.png';

const Home = () => {
    const [toggleSidebar, setToggleSidebar] = useState(false)
    const [user, setUser] = useState(null)
    const scrollRef = useRef(null);

    const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')):localStorage.clear();
    

    useEffect(() => {
        const query = userQuery(userInfo?.googleId); // "?." is optional chianing
        client.fetch(query)
            .then((data) => {setUser(data[0]);})
    }, [])

    useEffect(() => {
        scrollRef.current.scrollTo(0,0)
    }, [])

    return (
        <div className='flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out'>
        {/* 
        use md:flex-row to apply the flex-row utility at only medium screen sizes and above.
        Use flex-row to position flex items horizontally in the same direction as text
         */}
         <div className='hidden md:flex h-screen flex-initial'>
            <Sidebar user={user && user} closeToggle={setToggleSidebar}/>
         </div>
            <div className='flex md:hidden flex-row'>
            <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
            <HiMenu fontSize={40} className='cursor-pointer' onClick={()=>setToggleSidebar(true)}/>
            <Link to="/">
                <img src={logo} alt="logo" className="w-28"/>
            </Link>
            <Link to={`user-profile/${user?._id}`}>
                <img src={user?.image} alt="logo" className="w-28"/>
            </Link>

            </div>

            {
                toggleSidebar && ( // This is conditional rendering from React
                    <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in '>
                    {/*
                    Overflow-y-auto, so that people can vertically scroll up and down.
                    
                     */}
                    <div className='absolute w-full flex justify-end items-center p-2'>
                    <AiFillCloseCircle fontSize={30} className='cursor-pointer' onClick={()=> setToggleSidebar(false)}/>
                    </div>
                    <Sidebar user={user && user}  closeToggle={setToggleSidebar}/> 
                    {/* this is also conditional rendering */}
                    </div>
                )}
            </div>
                <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
                        <Routes>
                            <Route path="/user-profile/:userId" element={<UserProfile/>}/>
                            <Route path="/*" element={<Pins user={user && user}/>}/> 
                            {/* Return user only if user exists */}

                         
                        </Routes>
                </div>
        </div>
    )
}

export default Home