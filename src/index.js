import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import registrationImage from "./resources/images/registration_image.jpg"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
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
</div>,
    <App />
);
