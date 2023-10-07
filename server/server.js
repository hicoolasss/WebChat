const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const User = require("./db_stuff/User"); // Импортируйте модель данных
const connectDB = require("./db_stuff/db"); // Импортируйте функцию подключения к базе данных
const userRoutes = require("./routes/userRoutes"); // Импортируйте маршруты
const cookieParser = require('cookie-parser');

connectDB().catch(console.dir);

const port = process.env.PORT || 5000;

app.use(cors({ 
    origin: 'http://localhost:3000',
    credentials: true 
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(userRoutes);


app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
