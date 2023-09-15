import "../style/magic.css/dist/magic.css";
import showErrorNotfication from "./showErrorNotification";

function sendInfo(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение отправки формы

    const form = document.getElementById("form");
    const formData = new FormData(form);

    // Получаем значения из полей формы
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    const username_input = document.getElementById("username");
    const email_input = document.getElementById("email");
    const password_input = document.getElementById("password");

    const body = document.querySelector("body");

    var hasNumber = /\d/;


    if (username === "") {
        showErrorNotfication("Please enter your username!", "username_error");
        return false;
    }
    else if (username.length < 3) {
        showErrorNotfication("Username must be at least 3 characters long!", "username_error");
        return false;
    }
    else if (username.length > 20) {
        showErrorNotfication("Username must be no more than 20 characters long!", "username_error");
        return false;
    }
    else if (hasNumber.test(username)) {
        showErrorNotfication("Username shouldn`t contain numbers!", "username_error");
        return false;
    }
    else if (email === "") {
        showErrorNotfication("Please enter your email!", "email_error");
        return false;
    }
    else if (email.length < 5) {
        showErrorNotfication("Email must be at least 5 characters long!", "email_error");
        return false;
    }
    else if (email.length > 30) {
        showErrorNotfication("Email must be no more than 50 characters long!", "email_error");
        return false;
    }
    else if (password === "") {
        showErrorNotfication("Please enter your password!", "password_error");
        return false;
    }
    else if (password.length < 3) {
        showErrorNotfication("Password must be at least 3 characters long!", "password_error");
        return false;
    }
    else if (password.length > 20) {
        showErrorNotfication("Password must be no more than 20 characters long!", "password_error");
        return false;
    }
    else {
        const array = ["username_error", "email_error", "password_error"];

        for (let index = 0; index < array.length; index++) {
            const error_check = document.querySelector(`.${array[index]}`);
            if (error_check) {
                document.body.removeChild(error_check);
            }
        }

        const success_notification = document.createElement("div");
        const success_message = document.createTextNode("Account created successfully!");

        // Добавляем элемент на страницу
        document.body.appendChild(success_notification);

        // Добавляем класс "error" к элементу
        success_notification.classList.add("success_notification");

        // После того, как элемент добавлен на страницу, добавляем классы анимации
        success_notification.classList.add('magictime', 'tinUpIn');

        success_notification.appendChild(success_message);
    }

    // Проверяем, что значения получены корректно
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);

    // Отправляем данные на сервер
    fetch("http://localhost:5000/submit", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(`Response Data:`, data);
        })
        .catch(error => {
            console.error("Ошибка при отправке данных:", error);
        });
    return true;
}

export default sendInfo;