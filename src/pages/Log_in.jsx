import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import '../style/registration.css'

import UseAnimations from "react-useanimations";
import loading3 from "react-useanimations/lib/loading3";
import visibility from "react-useanimations/lib/visibility";

import registrationImage from "../resources/images/registration_image.jpg"
const LogIn = () => {
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
                <div className="log_in_back" id="secondary_background">
                    <div id="image_box">
                        <img
                            src={registrationImage}
                            alt="registration_image"
                            id="registration_image"
                        />
                    </div>
                    <div id="registration_container">
                        <p id="banner">Hello again!</p>
                        <p id="desc">Welcome back you`ve been missed!</p>
                        <form id="log_in_form">
                            <label htmlFor="name">Username or email</label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="Username or email"
                                required=""
                            />

                            <label htmlFor="password">Password</label>
                            <div className="password_box">
                                <input
                                    type={isRevealPwd ? "text" : "password"}
                                    className="input-field"
                                    name="password"
                                    placeholder="Password"
                                    required=""
                                />
                                <div className="visibility"><UseAnimations animation={visibility} reverse={true} size={28} strokeColor="#DFEAFF" speed={3} onClick={() => setIsRevealPwd(prevState => !prevState)} /></div>
                            </div>
                            <button type="submit" className="Log_in_btn_in_log_in_page" onClick={(e) => {
                                e.preventDefault(); // Предотвращаем отправку формы
                                // Ваши дополнительные действия, связанные с кнопкой "Sign In"
                            }}>
                                Log In
                            </button>
                            <div className="dont_have_acc_box">
                                <p>Don`t have account?&nbsp; </p>
                                <Link className="log_in_link" to="/registration">
                                    Sign up
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LogIn;