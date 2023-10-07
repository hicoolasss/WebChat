import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate, redirect } from "react-router-dom";
import './style/registration.css'
import Registration from './pages/Registration';
import LogIn from './pages/Log_in'
import Home from './pages/Home'
import Friends from './pages/Friends'

import { Context } from "./index";

import { useNavigate } from "react-router-dom";


import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  const { store } = useContext(Context);

  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {

    async function fetchData() {
      try {
        await store.checkAuth(); // Запускаем проверку аутентификации
        setData(data);
        setLoading(false);
        console.log("data", store.isAuth);

        console.log("username", store.user.username);
        if (store.isAuth) {
          navigate("/home");
        }
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchData();

  }, []);


  return (

    <Routes>
      <Route path="/" element={<Registration />} index />
      <Route path="login" element={<LogIn />} />
      <Route path="registration" element={<Registration />} />


      <Route path="home" element={<Home />} />
      <Route path="friends" element={<Friends />} />

    </Routes>

  );
}

export default App;

