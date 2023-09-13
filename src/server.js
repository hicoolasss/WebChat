const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();


const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Маршруты для вашего сервера
app.get("/", (req, res) => {
    res.send("Сервер работает!");
});

// Маршруты для вашего сервера
app.post('/submit', (req, res) => {
    const formData = req.body;
    
    // Получаем данные из JSON-объекта
    const { username, email, password } = formData;
    
    console.log("Received data:", formData);

    // Отправляем JSON-ответ
    res.json({
        username,
        email,
        password
    });
});


// Добавьте здесь другие маршруты, если необходимо

app.listen(port, () => {
    console.log(`Server is running on port localhost:${port}`);
});
