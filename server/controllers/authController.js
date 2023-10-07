// UserController.js


const tokenService = require('../service/tokenService');
const userService = require('../service/userSevice');





class UserController {

    static async home(req, res) {
        res.send("Home page");
    }

    static async createUser(req, res) {
        const formData = req.body;
        try {
            const userData = await userService.registration(formData);

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (error) {
            console.error("Error creating user:", error); loginCookies

            if (error.message === "Username already exists") {
                return res.status(400).json({ error: "Username already exists" });
            }

            if (error.message === "Email already exists") {
                return res.status(400).json({ error: "Email already exists" });
            }

            // Обработка всех других ошибок
            return res.status(500).json({ error: error.message });
        }
    }

    static async authenticateUser(req, res) {
        const {username, password} = req.body;
        try {
            console.log("Username:", username);
            console.log("Password:", password);
            const userData = await userService.login(username, password);
            console.log("UserData:", userData);
            res.cookie('refreshToken', userData.tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            console.log("Set-Cookie header:", res.get('Set-Cookie'));

            return res.json(userData);
        } catch (error) {
            console.error('Ошибка при аутентификации:', error);
            // Обработка ошибки
            res.status(500).json({ error: "Incorrect username or password" });
        }
    }

    static async logout(req, res) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (error) {
            console.error('Ошибка при выходе:', error);
        }
    }

    static async refresh(req, res) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (error) {
            console.error('Ошибка при обновлении токена:', error);
        }
    }

    static async getUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (error) {
            console.error('Ошибка при получении пользователей:', error);
        }
    }
}

module.exports = UserController;

