import $api from "../http";

export default class AuthService {

    static login(username, password) {
        return $api.post('/login', { username, password });
    }

    static registration(username, email,  password) {
        return $api.post('/registration', { username, email,  password });
    }

    static logout() {
        return $api.post('/logout');
    }
}
