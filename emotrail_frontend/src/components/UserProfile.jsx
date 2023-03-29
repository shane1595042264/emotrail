import React, {useState, useEffect} from 'react'
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import { fetchUser } from '../utils/fetchUser';
import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data';

import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const randomImage = 'https://source.unsplash.com/1600x900/?nature,photography,technology'

const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [pins, setPins] = useState(null);
    const [text, setText] = useState('Created');
    const [currentGrade, setCurrentGrade] = useState(user?.grade);
    const [activeBtn, setActiveBtn] = useState('created');
    const navigate = useNavigate();
    const {userId} = useParams();
    useEffect(() => {
    const user = fetchUser();  
    
    if(!user) navigate('/login');
    }, []);
    useEffect(() => {
      const query = userQuery(userId);

      client.fetch(query)
      .then((data)=> {
          setUser(data[0])
        //   console.log(data);
      })
    
    }, [userId]);

    useEffect(() => {
        setCurrentGrade(user?.grade)
    
    }, [userId]);
    
    useEffect(() => {
      if(text==='Created') {
          const createdPinsQuery = userCreatedPinsQuery(userId);
          client.fetch(createdPinsQuery)
          .then((data)=> {
              setPins(data);
          })
      }else{
        const savedPinsQuery = userSavedPinsQuery(userId);
        client.fetch(savedPinsQuery)
        .then((data)=> {
            setPins(data);
        })
      }
    
    }, [text, userId]);

    const logout = ()=>{
        localStorage.clear();
        navigate('/login');
    }
    const setGrade = (gradeName)=>{
    
        client.patch(user._id)
        .set({grade: gradeName})
        .commit()
        .then((e)=>{
            console.log('Update succeeded');
            console.log(e);
            setCurrentGrade(gradeName);
        })
        .catch((err)=>{
            console.log('Update failed', err.message);
        })
    }
    if(!user) {
        return <Spinner message="Loading profile..."/>
    }
    return (
        <div className=' relative pb-2 h-full justify-center items-center'>
            <div className=' flex flex-col pb-5'>
                <div className=' relative flex flex-col mb-7'>
                <div className=' flex flex-col justify-center items-center'>
                {/* {console.log(user.grade)} */}
                <img 
                    src={randomImage}
                    className=' w-full h-370 2xl:h-510 shadow-lg object-cover'
                    alt='banner-pic'
                />
                <img

                    className=' rounded-full w-20 h-20 -mt-10 shadow-xl object-cover'
                    src={user.image}
                    alt="user-pic"
                />
                <h1 className=' font-bold text-3xl text-center mt-3'>
                    {user.userName}
                </h1>
                <div className=' absolute top-0 z-1 right-0 p-2'>
                    {userId === user._id && (
                        <GoogleLogout
                            clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                            render={(renderProps)=>(
                                <button
                                type='button'
                                className=' bg-white p-2 rounded-full cursor-pointer outline-none shadow-md'
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                >
                                <AiOutlineLogout color='red' fontSize={21}/>
                              

                                </button>
                            )}  
                            onLogoutSuccess={logout}
                            cookiePolicy='single_host_origin'
                        />
                    )}
                </div>
                </div>
                <div className=' text-center mb-7'>
                    <button
                    type='button'
                    onClick={(e)=> {
                        setText(e.target.textContent)
                        setActiveBtn('created');
                    }}
                    className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
                    >
                        Created
                    </button>
                    <button
                    type='button'
                    onClick={(e)=> {
                        setText(e.target.textContent)
                        setActiveBtn('saved');
                    }}
                    className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
                    >
                        Saved
                    </button>
                </div>
                <p className='flex justify-center mb-2 font-semibold text-lg sm:text-xl'> What's your current grade?</p>
                <div className=' flex justify-center items-center mt-5 p-5'>
          
          <button
   type='button'
   onClick={()=>setGrade("Freshman")}
   className=' bg-yellow-500 text-white font-bold p-2 rounded-full w-28 outline-none'>
    Freshman
   </button>
          <button
   type='button'
   onClick={()=>setGrade('Sophomore')}
   className=' bg-green-500 text-white font-bold p-2 rounded-full w-28 outline-none'>
    Sophomore
   </button>
          <button
   type='button'
   onClick={()=>setGrade('Junior')}
   className=' bg-blue-500 text-white font-bold p-2 rounded-full w-28 outline-none'>
    Junior
   </button>
          <button
   type='button'
   onClick={()=>setGrade('Senior')}
   className=' bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none'>
    Senior
   </button>
</div>
 <p className='flex justify-center mb-2 font-semibold text-lg sm:text-xl'> Your current grade is {currentGrade}</p>
                    {pins?.length ? (
                        <div className=' px-2'>
                        <MasonryLayout pins={pins}/>
                        </div>
                    ): (
                        <div className='flex justify-center font-bold items-center w-full text-xl mt-2'>
                            No Pins Found!
                        </div>
                    )}
            
                </div>
            </div>
        </div>
    )
}

export default UserProfile
