const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const User = require("./db_stuff/User"); // Импортируйте модель данных
const connectDB = require("./db_stuff/db"); // Импортируйте функцию подключения к базе данных
const userRoutes = require("./routes/userRoutes"); // Импортируйте маршруты

connectDB().catch(console.dir);

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(userRoutes);


app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
