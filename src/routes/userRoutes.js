const express = require("express");
const router = express.Router();
const User = require("../db_stuff/User");
const UserController = require("../controllers/authController"); // Импортируйте контроллер

// Маршруты, соответствующие методам контроллера
// router.get('/', UserController.home);
router.post('/registration', UserController.createUser);
router.post('/login', UserController.authenticateUser);

module.exports = router;