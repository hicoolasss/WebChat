function sendInfo(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение отправки формы

    const form = document.getElementById("form");
    const formData = new FormData(form);

    // Получаем значения из полей формы
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

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