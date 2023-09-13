import "../style/magic.css/dist/magic.css";

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

    if (username === "") {
        const error_notification = document.createElement("div");
        const error_message = document.createTextNode("Please enter your username!");
    
        // Добавляем элемент на страницу
        document.body.appendChild(error_notification);
    
        // Добавляем класс "error" к элементу
        error_notification.classList.add("error");
    
        // После того, как элемент добавлен на страницу, добавляем классы анимации
        error_notification.classList.add('magictime', 'puffIn');
    
        error_notification.appendChild(error_message);
    
        return;
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
}



export default sendInfo;