

async function checkLoginData(event) {
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
                const success_notification = document.createElement("div");
                const success_message = document.createTextNode("Log in successful!");

                // Добавляем элемент на страницу
                document.body.appendChild(success_notification);

                // Добавляем класс "error" к элементу
                success_notification.classList.add("success_notification");

                // После того, как элемент добавлен на страницу, добавляем классы анимации
                success_notification.classList.add('magictime', 'tinUpIn');

                success_notification.appendChild(success_message);
                
                return true;
            } else {
                console.log('Пользователь не найден');
                // Пользователь не найден, выполняйте нужные действия
            }
        } else {
            console.error('Ошибка при запросе:', response.statusText);
            // Обработка ошибки при запросе
        }
    } catch (error) {
        console.error('Ошибка при поиске пользователя:', error);
        // Обработка ошибки
    }
}


export default checkLoginData;