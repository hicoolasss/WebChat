// UserController.js
const jwt = require("jsonwebtoken");
const User = require("../db_stuff/User");

const jwtSecret = "pidorpizda"; // Замените "your-secret-key" на ваш секретный ключ

class UserController {
    // ...

    static async createUser(req, res) {
        // ...
        const formData = req.body;
        try {
            // Создание нового пользователя в базе данных
            const user = new User(formData);

            const username = await User.findOne({ username: formData.username });
            const email = await User.findOne({ email: formData.email });

            if (username) {
                res.status(400).json({ message: "Username already exists" });
            } else if (email) {
                res.status(400).json({ message: "Email already exists" });
            } else {
                await user.save();

                const userId = user._id;

                // Генерируем JWT токен
                const token = jwt.sign({
                    id: userId,
                    login: formData.username,
                }, jwtSecret, { expiresIn: "7d" }); // Пример срока действия 7 дней

                // Устанавливаем JWT токен в заголовок "Set-Cookie" в HTTP-ответе
                res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Max-Age=604800; Path=/; SameSite=Strict`);

                // Отправляем успешный ответ
                res.json({ message: 'User created successfully', userId });

                console.log("User created:", user);
            }
        } catch (error) {
            console.error("Error creating user:", error);
            // Отправка ошибки в случае неудачи
            res.status(500).json({ error: "Failed to create user" });
        }
    }

    static async authenticateUser(req, res) {
        const formData = req.body;
        try {
            // Проверка существования пользователя по имени пользователя или email
            const username = await User.findOne({ username: formData.username });
            const email = await User.findOne({ email: formData.email });

            if (username || email) {
                var isPasswordMatch = false;

                if (username && username.password === formData.password) {
                    isPasswordMatch = true;
                } else if (email && email.password === formData.password) {
                    isPasswordMatch = true;
                }

                if (isPasswordMatch) {
                    // Пароль совпадает, пользователь успешно аутентифицирован

                    // Генерируем JWT токен для аутентифицированного пользователя
                    const token = jwt.sign({ userId: username ? username._id : email._id }, jwtSecret, { expiresIn: "7d" });

                    // Устанавливаем JWT токен в заголовок "Set-Cookie" в HTTP-ответе
                    res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Max-Age=604800; Path=/; SameSite=Strict`);

                    res.json({ message: "Authentication successful", user: username || email });
                } else {
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
    }
}

module.exports = UserController;

