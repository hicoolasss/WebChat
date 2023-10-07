import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './style/registration.css'
import Registration from './pages/Registration';
import LogIn from './pages/Log_in'
import Home from './pages/Home'
import Friends from './pages/Friends'
import Settings from './pages/Settings'

import { Context } from "./index";

import { useNavigate } from "react-router-dom";

import ProtectedRoute from "./pages/ProtectedRoute";

import HomeContainer from "./pages/HomeContainer";

function App() {
  const { store } = useContext(Context);

  const navigate = useNavigate();

  const [data, setData] = useState(null);

  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        await store.checkAuth();
        setData(data);
        console.log("data", store.isAuth);
        console.log("username", store.user.username);
        if (store.isAuth && !hasNavigated && window.location.pathname !== '/friends') {
          setHasNavigated(true);
          const redirectTo = window.location.state?.from || "/home";
          navigate(redirectTo);
        }
      } catch (error) {
        // Обработка ошибок
      }
    }
    fetchData();
  }, []);


  return (

    <Routes>
      <Route path="/" element={<Registration />} index />
      <Route path="login" element={<LogIn />} />
      <Route path="registration" element={<Registration />} />


      <Route path="home" element={<ProtectedRoute component={HomeContainer} />}>
        <Route index element={<Home />} />
        <Route path="friends" element={<Friends />} />
        <Route path="settings" element={<Settings />} />
      </Route>

    </Routes>

  );
}

export default App;

