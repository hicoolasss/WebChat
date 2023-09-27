// User.js
const mongoose = require("mongoose");

// Определение схемы данных для пользователей
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  avatar: {
    type: String,
    default: "../resources/images/test_avatar.jpg", // Путь к изображению по умолчанию
  },
});

userSchema.methods.getAvatar = function () {
  return this.avatar;
};

// Метод для очистки (удаления всех записей) таблицы пользователей
userSchema.statics.clearTable = async function () {
  try {
    const result = await this.deleteMany({});
    console.log(`Удалено ${result.deletedCount} записей из коллекции пользователей.`);
  } catch (error) {
    console.error('Ошибка при очистке таблицы пользователей:', error);
  }
};

// Создание модели для пользователей
const User = mongoose.model("User", userSchema);

module.exports = User;
