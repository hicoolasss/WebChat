import React, { useState, useEffect } from "react";
import './registration.css'

import UseAnimations from "react-useanimations";
import loading3 from "react-useanimations/lib/loading3";


import registrationImage from "./resources/images/registration_image.jpg"


function App() {

  const [isLoading, setIsLoading] = useState(true);

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
            <p id="create_acc_banner">Create an account</p>
            <p id="create_acc_desc">Sign up and start chatting!</p>
            <form id="log_in_form">
              <label htmlFor="name">Username</label>
              <input
                type="text"
                className="input-field"
                placeholder="Username"
                required=""
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="input-field"
                name="email"
                placeholder="Email"
                required=""
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="input-field"
                name="password"
                placeholder="Password"
                required=""
              />
              <button type="submit" className="create_acc_btn">
                Create Account
              </button>
              <button type="submit" className="sign_in_btn">
                Sign In
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
