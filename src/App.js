import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import './style/registration.css'
import Registration from './pages/Registration';
import LogIn from './pages/Log_in'
import Home from './pages/Home'
import Friends from './pages/Friends'


function App() {

  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Registration />} index />
        <Route path="login" element={<LogIn />} />
        <Route path="registration" element={<Registration />} />
        <Route path="home" element={<Home/>} />
        <Route path="friends" element={<Friends/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

