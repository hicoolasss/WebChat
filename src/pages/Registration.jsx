import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

import '../style/registration.css'

import UseAnimations from "react-useanimations";
import loading3 from "react-useanimations/lib/loading3";
import visibility from "react-useanimations/lib/visibility";

import registrationImage from "../resources/images/registration_image.jpg"

import sendInfo from "../utils/registration";

import "../style/magic.css/dist/magic.css";

import deleteErrorNotification from "../utils/deleteErrorNotification";

import SplineAnimation from '../components/SplineAnimationRegistration';

function deleteErrorNotificationWithTimeout() {
  setTimeout(() => {
    deleteErrorNotification();
  }, 1000);
}



const Registration = () => {

  const [isLoading, setIsLoading] = useState(true);

  const [isRevealPwd, setIsRevealPwd] = useState(false);

  const [redirectToHome, setRedirectToHome] = useState(false);

  useEffect(() => {
    // Ваш код загрузки данных или ресурсов
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Имитируем задержку загрузки в 2 секунды
  }, []);

  async function navigateToHome(event) {
    
    const result = await sendInfo(event);
  
    if (result === true) {
      setRedirectToHome(true);
  
      // Ожидаем 5 секунд, прежде чем удалять уведомление
      setTimeout(() => {
        const success_notification = document.getElementsByClassName("success_notification")[0];
        if (success_notification) {
          // Удаление класса анимации и добавление класса для второй анимации
          success_notification.classList.remove("tinUpIn");
          success_notification.classList.add("tinUpOut");
  
          // Через некоторое время удалите элемент
          setTimeout(() => {
            if (document.body.contains(success_notification)) {
              document.body.removeChild(success_notification);
            }
          }, 10000);
        }
      }, 5000);
    } else {
      return;
    }
  }
  




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
                <form id="form" action="/submit" method="POST">
                  <label htmlFor="name">Username</label>
                  <input
                    type="text"
                    className="input-field"
                    name="username"
                    placeholder="Username"
                    required=""
                    id="username"
                  />
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="input-field"
                    name="email"
                    placeholder="Email"
                    required=""
                    id="email"
                  />
                  <label htmlFor="password">Password</label>
                  <div className="password_box">
                    <input
                      type={isRevealPwd ? "text" : "password"}
                      className="input-field"
                      name="password"
                      placeholder="Password"
                      required=""
                      id="password"
                    />
                    <div className="visibility"><UseAnimations animation={visibility} reverse={true} size={28} strokeColor="#DFEAFF" speed={3} onClick={() => setIsRevealPwd(prevState => !prevState)} /></div>
                  </div>
                  <Link className="Link" to="/home">
                    <input value={"Create Account"} type="submit" className="create_acc_btn" onClick={navigateToHome}></input>
                  </Link>
                  <Link className="Link" to="/login">
                    <button type="submit" className="sign_in_btn" onClick={deleteErrorNotificationWithTimeout}>
                      Sign In
                    </button>
                  </Link>

                </form>
              </div>
            </div>
          )}
    </div>
  );
};

export default Registration;
