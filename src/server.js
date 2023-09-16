const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const User = require("./db_stuff/User"); // Импортируйте модель данных



const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://first_user:1111@cluster0.jtz9col.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// Маршруты для вашего сервера
app.get("/", (req, res) => {
    res.send("Сервер работает!");
});

// Маршруты для вашего сервера
app.post("/submit", async (req, res) => {
    const formData = req.body;

    try {
        // Создание нового пользователя в базе данных
        const user = new User(formData);

        const username = await User.findOne({ username: formData.username });
        const email = await User.findOne({ email: formData.email });

        if (username) {
            res.status(400).json({ message: "Username already exists" });
        }  
        else if (email) {
            res.status(400).json({ message: "Email already exists" });
        } else {
            await user.save();
            console.log("User created:", user);
            // Отправка успешного ответа
            res.json({ message: "User created successfully" });
        }
    } catch (error) {
        console.error("Error creating user:", error);
        // Отправка ошибки в случае неудачи
        res.status(500).json({ error: "Failed to create user" });
    }
});


app.post("/check", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Проверка существования пользователя по имени пользователя или email
        const user = await User.findOne({ username: username });
        const user_w_email = await User.findOne({ email: username });

        if (user || user_w_email) {
            var isPasswordMatch = false;

            if (user && user.password === password) {
                isPasswordMatch = true;
            }
            else if (user_w_email && user_w_email.password === password) {
                isPasswordMatch = true;
            }

            if (isPasswordMatch) {
                // Пароль совпадает, пользователь успешно аутентифицирован
                res.json({ message: "Authentication successful", user: user || user_w_email });
            } else if (!isPasswordMatch) {
                // Пароль не совпадает, отправьте сообщение об ошибке
                res.status(401).json({ message: "Incorrect password" });
            }
        } else {
            // Пользователь с таким именем пользователя или email не существует
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error('Ошибка при аутентификации:', error);
        // Обработка ошибки
        res.status(500).json({ error: "Authentication failed" });
    }
});




// Добавьте здесь другие маршруты, если необходимо

app.listen(port, () => {
    console.log(`Server is running on port localhost:${port}`);
});
