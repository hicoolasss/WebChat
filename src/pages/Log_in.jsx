import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

import '../style/registration.css'

import UseAnimations from "react-useanimations";
import loading3 from "react-useanimations/lib/loading3";
import visibility from "react-useanimations/lib/visibility";

import registrationImage from "../resources/images/registration_image.jpg"

import showErrorNotfication from "../utils/showErrorNotification";

import deleteErrorNotification from "../utils/deleteErrorNotification";

window.addEventListener('popstate', function (event) {
    // Вызывается при нажатии на стрелки "назад" или "вперед" в браузере
    console.log('Пользователь выполнил навигацию вперед или назад');
    setTimeout(() => {
        deleteErrorNotification();
    }, 1000);
    // Вы можете выполнить здесь нужные вам действия, например, обновить содержимое страницы
});

function deleteErrorNotificationWithTimeout() {
    setTimeout(() => {
      deleteErrorNotification();
    }, 1000);
  }
  

const LogIn = () => {
    const [isLoading, setIsLoading] = useState(true);

    const [isRevealPwd, setIsRevealPwd] = useState(false);

    const [redirectToHome, setRedirectToHome] = useState(false);

    useEffect(() => {
        // Ваш код загрузки данных или ресурсов
        setTimeout(() => {
            setIsLoading(false);
        }, 2000); // Имитируем задержку загрузки в 2 секунды
    }, []);

    const navigateToHome = async (event) => {
        event.preventDefault();

        const form = document.getElementById("log_in_form");
        const formData = new FormData(form);

        const username = formData.get("username");
        const password = formData.get("password");

        try {
            console.log(username, password);
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const user = await response.json();

                if (user) {

                    console.log('Пользователь найден:', user);

                    setRedirectToHome(true); // Установка состояния перехода

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
                } else {
                    console.log('Пользователь не найден');
                    // Пользователь не найден, выполняйте нужные действия
                }
            }
            else if (response.status === 404) {
                showErrorNotfication("Incorrect username or email!", "username_error");
            }
            else if (response.status === 401) {
                showErrorNotfication("Incorrect password!", "password_error");
            }
        } catch (error) {
            console.error('Ошибка при поиске пользователя:', error);
            // Обработка ошибки
        }

    }
    return (
        <div>
            {isLoading ? (
                <div><UseAnimations animation={loading3} size={150} strokeColor="#DFEAFF" /></div>
            ) : redirectToHome ? (

                <Navigate to="/home" />
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
                        <form id="log_in_form" action="/check" method="POST">
                            <label htmlFor="name">Username or email</label>
                            <input
                                type="text"
                                className="input-field"
                                name="username"
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
                            <input type="submit" value={"Log in"} className="Log_in_btn_in_log_in_page" onClick={navigateToHome}></input>
                            <div className="dont_have_acc_box">
                                <p>Don`t have account?&nbsp; </p>
                                <Link className="log_in_link" to="/registration" onClick={deleteErrorNotificationWithTimeout}>
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