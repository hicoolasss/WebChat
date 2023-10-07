const User = require('../db_stuff/User');
const UserDto = require('../dto/userDto');
const ApiError = require('../exceptions/apiError');

const tokenService = require('../service/tokenService');
class UserService {
    async registration(username, email, password) {
        const check_username = await User.findOne({ username: username });
        const check_email = await User.findOne({ email: email });

        if (check_username) {
            throw new Error("Username already exists");
        }

        if (check_email) {
            throw new Error("Email already exists");
        }

        const user = new User({
            username: username,
            email: email,
            password: password  // You should hash the password before saving it!
        });
        console.log('Пользователь перед сохранением:', user);
        await user.save();

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            message: 'User created successfully',
            userId: user._id,
            tokens,
            user: userDto
        };
    }



    async login(username, password) {
        const user = await User.findOne({
            $or: [
                { username: username },
                { email: username }
            ]
        });

        if (!user) {
            // Пользователь с таким именем пользователя или email не существует
            throw new Error("User not found");
        }

        if (user.password !== password) {
            // Пароль не совпадает, отправьте сообщение об ошибке
            throw new Error("Incorrect password");
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            message: "Authentication successful",
            tokens,
            user: userDto
        };

    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await User.findById(userData.id);
        if (!user) {
            throw new Error("Пользователь не найден");
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto }


    }


    async getAllUsers() {
        const users = await User.find();
        return users;
    }
}

module.exports = new UserService();