import React, {useEffect} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './container/Home';
import { fetchUser } from './utils/fetchUser';
import AllChart from './components/AllChart';




const App = () => {
const navigate = useNavigate();
useEffect(() => {
const user = fetchUser();  

if(!user) navigate('/login');
}, []);

return(
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
      <Route path="chart" element={<AllChart />} />

    </Routes>
);
};

export default App;
