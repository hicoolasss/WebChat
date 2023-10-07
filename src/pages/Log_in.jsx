import React, { useState, useEffect, useContext } from "react";
import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

import '../style/registration.css'

import UseAnimations from "react-useanimations";
import loading3 from "react-useanimations/lib/loading3";
import visibility from "react-useanimations/lib/visibility";


import showErrorNotfication from "../utils/showErrorNotification";
import deleteErrorNotification from "../utils/deleteErrorNotification";

import SplineAnimation from '../components/SplineAnimationLogin';

import { Context } from "../index";


const LogIn = () => {
    const [isLoading, setIsLoading] = useState(true);

    const [isRevealPwd, setIsRevealPwd] = useState(false);


    const [username, setUsername] = useState('')

    const [password, setPassword] = useState('')

    const { store } = useContext(Context);

    const navigate = useNavigate();

    function deleteErrorNotificationWithTimeout() {
        setTimeout(() => {
            deleteErrorNotification();
        }, 1000);
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
            ) : (
                <div className="log_in_back" id="secondary_background">
                    <div id="image_box">
                        <SplineAnimation />
                    </div>
                    <div id="registration_container">
                        <p id="banner">Hello again!</p>
                        <p id="desc">Welcome back you`ve been missed!</p>
                        <div id="log_in_form">
                            <label htmlFor="name">Username or email</label>
                            <input
                                type="text"
                                className="input-field"
                                name="username"
                                value={username}
                                placeholder="Username or email"
                                required=""
                                onChange={e => setUsername(e.target.value)}
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
                                    onChange={e => setPassword(e.target.value)}
                                />
                                <div className="visibility"><UseAnimations animation={visibility} reverse={true} size={28} strokeColor="#DFEAFF" speed={3} onClick={() => setIsRevealPwd(prevState => !prevState)} /></div>
                            </div>
                            <button className="Log_in_btn_in_log_in_page" onClick={() => store.login(username, password).then(() => {
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
                                } else {
                                    showErrorNotfication("Invalid username or password!", "username_error");
                                }
                            })}>Log in</button>
                            <div className="dont_have_acc_box">
                                <p>Don`t have account?&nbsp; </p>
                                <Link className="log_in_link" to="/registration" onClick={deleteErrorNotificationWithTimeout}>
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </div >
    );
    // return (
    //     <div>
    //         <input
    //             onChange={e => setUsername(e.target.value)}
    //             value={username}
    //             type="text"
    //             placeholder='name'
    //         />
    //         <input
    //             onChange={e => setPassword(e.target.value)}
    //             value={password}
    //             type="password"
    //             placeholder='Пароль'
    //         />
    //         <button onClick={() => store.login(username, password)}>
    //             Логин
    //         </button>
    //         <button onClick={() => store.registration(email, password)}>
    //             Регистрация
    //         </button>
    //     </div>
    // );
};

export default LogIn;