// User.js
const mongoose = require("mongoose");

// Определение схемы данных для пользователей
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

// Создание модели для пользователей
const User = mongoose.model("User", userSchema);

module.exports = User;
