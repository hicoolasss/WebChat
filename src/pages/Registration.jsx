import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import '../style/registration.css'

import UseAnimations from "react-useanimations";
import loading3 from "react-useanimations/lib/loading3";
import visibility from "react-useanimations/lib/visibility";

import registrationImage from "../resources/images/registration_image.jpg"

import sendInfo from "../utils/registration";


const Registration = () => {

  const [isLoading, setIsLoading] = useState(true);

  const [isRevealPwd, setIsRevealPwd] = useState(false);

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
      ) : (
        <div id="secondary_background">
          <div id="image_box">
            <img
              src={registrationImage}
              alt="registration_image"
              id="registration_image"
            />
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
              <input value={"Create Account"} type="submit" className="create_acc_btn" onClick={sendInfo} >
              </input>
              <Link className="Link" to="/login">
                <button type="submit" className="sign_in_btn">
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

// formMethod="post" onClick={sendInfo}

export default Registration;