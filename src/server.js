const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose"); // Импортируйте Mongoose
const User = require("./db_stuff/User"); // Импортируйте модель данных

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


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


// Подключение к MongoDB
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});



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
        await user.save();

        // Удаление всех пользователей в коллекции
        /* 
        
        
        const collectionName = 'users'; // Здесь имя коллекции как строка
        const collection = mongoose.connection.collection(collectionName);
        await collection.deleteMany({});
         
         */

        console.log("User created:", user);


        // Отправка успешного ответа
        res.json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error);

        // Отправка ошибки в случае неудачи
        res.status(500).json({ error: "Failed to create user" });
    }
});



// Добавьте здесь другие маршруты, если необходимо

app.listen(port, () => {
    console.log(`Server is running on port localhost:${port}`);
});
