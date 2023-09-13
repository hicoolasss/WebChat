import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import './style/registration.css'
import Registration from './pages/Registration';
import LogIn from './pages/Log_in'


function App() {

  // const [state, setState] = useState(null);

  // const callBackendAPI = async () => {
  //   const response = await fetch('/express_backend');
  //   const body = await response.json();

  //   if (response.status !== 200) {
  //     throw Error(body.message)
  //   }
  //   return body;
  // };
  
  // // получение GET маршрута с сервера Express, который соответствует GET из server.js 
  // useEffect(() => {
  //   callBackendAPI()
  //   .then(res => setState(res.express))
  //   .catch(err => console.log(err));
  // }, []);

  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Registration />} index />
        <Route path="login" element={<LogIn />} />
        <Route path="registration" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

