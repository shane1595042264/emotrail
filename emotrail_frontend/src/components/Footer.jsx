import React from 'react'
import { Routes, Route, Link } from 'react-router-dom';
const 
 Footer= () => {
  return (
    <div className=' mt-1 p-1 bg-yellow-500 fixed bottom-0 left-0 w-full'>
<Link to="/privacy">
Click to view our privacy policy and public terms of service
</Link>
    </div>
  )
}

export default Footer;
