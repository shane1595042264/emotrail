import React from 'react';
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import logo2 from '../assets/emo2trans.png';
import Footer from './Footer'
import { client } from '../client';

const Login = () => {
    const navigate = useNavigate();
    const responseGoogle = (response) => {
        localStorage.setItem('user', JSON.stringify(response.profileObj));
        // console.log(JSON.stringify(response.profileObj)); (c)
        const { name, googleId, imageUrl} = response.profileObj;
        const doc = {
            _id: googleId,
            _type: 'user',
            userName: name,
            image: imageUrl,
        };
        client.createIfNotExists(doc).then(() => {
                navigate('/', { replace: true });
            });

        };
    return (
        <div className='flex justify-start items-center flex-col h-screen'> 
            <div className='relative w-full h-full'>
                <video 
                src={shareVideo}  
                // you can change video here
                type='video/mp4' 
                controls={false} 
                loop 
                muted 
                autoPlay 
                className='w-full h-full object-cover'
                />
                <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
                    <div className='p-5'>
                        <img src={logo2}  width= "330" alt="logo"/>
                    </div>

                    <div className='shadow-2xl'>
                        <GoogleLogin 
                            clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
                            render={(renderProps)=>(
                                <button
                                type='button'
                                className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                >
                                <FcGoogle className='mr-4'/> Sign in with Google

                                </button>
                            )}  
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy='single_host_origin'
                        />
                    </div>
                </div>
                <Footer/>
            </div>
            
        </div>
    );
};

export default Login;