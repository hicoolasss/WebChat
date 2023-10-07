import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import '../style/registration.css'
import "../style/magic.css/dist/magic.css";

import UseAnimations from "react-useanimations";
import loading3 from "react-useanimations/lib/loading3";
import visibility from "react-useanimations/lib/visibility";

import deleteErrorNotification from "../utils/deleteErrorNotification";

import SplineAnimation from '../components/SplineAnimationRegistration';

import { Context } from "../index";

import showErrorNotfication from "../utils/showErrorNotification";



function deleteErrorNotificationWithTimeout() {
  setTimeout(() => {
    deleteErrorNotification();
  }, 1000);
}

function validateForm(username, email, password) {
  const hasNumber = /\d/;

  const errors = {
    username_error: [],
    email_error: [],
    password_error: []
  };

  if (username === "") errors.username_error.push("Please enter your username!");
  if (username.length < 3) errors.username_error.push("Username must be at least 3 characters long!");
  if (username.length > 20) errors.username_error.push("Username must be no more than 20 characters long!");
  if (hasNumber.test(username)) errors.username_error.push("Username shouldn't contain numbers!");

  if (email === "") errors.email_error.push("Please enter your email!");
  if (email.length < 5) errors.email_error.push("Email must be at least 5 characters long!");
  if (email.length > 30) errors.email_error.push("Email must be no more than 50 characters long!");

  if (password === "") errors.password_error.push("Please enter your password!");
  if (password.length < 3) errors.password_error.push("Password must be at least 3 characters long!");
  if (password.length > 20) errors.password_error.push("Password must be no more than 20 characters long!");

  for (let errorType in errors) {
    if (errors[errorType].length) {
      showErrorNotfication(errors[errorType].join(' '), errorType);
      return false;
    } else {
      const error_check = document.querySelector(`.${errorType}`);
      if (error_check) {
        document.body.removeChild(error_check);
      }
    }
  }

  return true;
}


const Registration = () => {

  const [isLoading, setIsLoading] = useState(true);

  const [isRevealPwd, setIsRevealPwd] = useState(false);

  const [redirectToHome, setRedirectToHome] = useState(false);

  const [username, setUsername] = useState('')

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const { store } = useContext(Context);

  const navigate = useNavigate();

  const handleCreateAccount = () => {
    if (validateForm(username, email, password)) {
      store.registration(username, email, password).then(() => {
        console.log("isAuth is:" + store.isAuth);
        if (store.isAuth) {
          navigate("/home");
          const success_notification = document.createElement("div");
          const success_message = document.createTextNode("Log in successful!");
  
          // Добавляем элемент на страницу
          document.body.appendChild(success_notification);
  
          // Добавляем класс "error" к элементу
          success_notification.classList.add("success_notification");
  
          // После того, как элемент добавлен на страницу, добавляем классы анимации
          success_notification.classList.add('magictime', 'tinUpIn');
  
          success_notification.appendChild(success_message);
  
          setTimeout(() => {
              const success_notification = document.getElementsByClassName("success_notification")[0];
  
              // Удаление класса анимации и добавление класса для второй анимации
              success_notification.classList.remove("tinUpIn");
              success_notification.classList.add("tinUpOut");
  
              // Через некоторое время удалите элемент
              setTimeout(() => {
                  document.body.removeChild(success_notification);
              }, 1000);
          }, 5000);
          deleteErrorNotification();
          console.log("redirected to home and isAuth is:" + store.isAuth);
      }
      }).catch((error) => {
        showErrorNotfication(error.response.data.error, "username_error");
      })
    }
  }



  useEffect(() => {
    // Ваш код загрузки данных или ресурсов
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Имитируем задержку загрузки в 2 секунды
  }, []);



  return (
    <div>
      {isLoading ? (
        <div><UseAnimations animation={loading3} size={150} strokeColor="#DFEAFF" /></div>
      )
        : redirectToHome ? (
          <Navigate to="/home" />
        )
          :
          (
            <div id="secondary_background">
              <div id="image_box">
                <SplineAnimation />
              </div>
              <div id="registration_container">
                <p id="banner">Create an account</p>
                <p id="desc">Sign up and start chatting!</p>
                <div id="form">
                  <label htmlFor="name">Username</label>
                  <input
                    type="text"
                    className="input-field"
                    name="username"
                    value={username}
                    placeholder="Username"
                    required=""
                    id="username"
                    onChange={e => setUsername(e.target.value)}
                  />
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="input-field"
                    name="email"
                    value={email}
                    placeholder="Email"
                    required=""
                    id="email"
                    onChange={e => setEmail(e.target.value)}
                  />
                  <label htmlFor="password">Password</label>
                  <div className="password_box">
                    <input
                      type={isRevealPwd ? "text" : "password"}
                      className="input-field"
                      name="password"
                      value={password}
                      placeholder="Password"
                      required=""
                      id="password"
                      onChange={e => setPassword(e.target.value)}
                    />
                    <div className="visibility"><UseAnimations animation={visibility} reverse={true} size={28} strokeColor="#DFEAFF" speed={3} onClick={() => setIsRevealPwd(prevState => !prevState)} /></div>
                  </div>

                  <button className="create_acc_btn" onClick={handleCreateAccount} >Create account</button>

                  <Link className="Link" to="/login">
                    <button type="submit" className="sign_in_btn" onClick={deleteErrorNotificationWithTimeout}>
                      Sign In
                    </button>
                  </Link>

                </div>
              </div>
            </div>
          )}
    </div>
  );
};

export default Registration;
