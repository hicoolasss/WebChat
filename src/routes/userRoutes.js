const express = require("express");
const router = express.Router();
const User = require("../db_stuff/User");
const UserController = require("../controllers/authController"); // Импортируйте контроллер
const authMiddleware = require('../middlewares/authMiddleware');

// Маршруты, соответствующие методам контроллера
router.get('/', UserController.home);
router.post('/registration', UserController.createUser);
router.post('/login', UserController.authenticateUser);
router.post('/logout', UserController.logout);
router.get('/refresh', UserController.refresh);
router.get('/users', authMiddleware, UserController.getUsers);


// function checkToken(req, res, next) {
//     let token = req.cookies.token;
//     if (!token)
//         return res.redirect("/login");
//     jsonwebtoken.verify(token, "securepass", (err, decoded) => {
//         if (err) {
//             res.status(403).clearCookie('token').redirect("/login");
//             return;
//         }
//         req.user = decoded;
//         next();
//     });
// }

module.exports = router;