import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import axios from 'axios';
import { API_URL } from "../http/index";

import UserService from "../services/UserService";


export default class Store {
    user = {};
    isAuth = false;
    isLoading = false;
    users = [];

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    setLoading(bool) {
        this.isLoading = bool;
    }
    
    setUsers(users) { 
        this.users = users;
    }
    

    async login(username, password) {
        try {
            const response = await AuthService.login(username, password);

            localStorage.setItem('token', response.data.accessToken);
            console.log(response);
            
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error) {
            if (error.response) {
                // Сервер вернул ответ с кодом ошибки
                console.error(error.response.data.error); // здесь будет ваше сообщение об ошибке, например, "Username already exists"
        
            } else if (error.request) {
                // Запрос был сделан, но ответ не был получен
                console.error("No response from server", error.request);
            } else {
                // Произошла какая-то другая ошибка при отправке запроса
                console.error("Error", error.message);
            }

            throw error;
        }
    }

    async registration(username, email,  password) {
        try {
            const response = await AuthService.registration(username, email,  password);
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error) {
            if (error.response) {
                // Сервер вернул ответ с кодом ошибки
                console.error(error.response.data.error); // здесь будет ваше сообщение об ошибке, например, "Username already exists"
        
            } else if (error.request) {
                // Запрос был сделан, но ответ не был получен
                console.error("No response from server", error.request);
            } else {
                // Произошла какая-то другая ошибка при отправке запроса
                console.error("Error", error.message);
            }

            throw error;
        }
    }

    async logout() {
        try {
            console.log('logout');
            const response = await AuthService.logout();
            console.log(response);
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({});
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get(`${API_URL}refresh`, { withCredentials: true });
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            console.log(this.isAuth);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }

    async fetchUsers() {
        try {
            const response = await UserService.fetchUsers(); // Убедитесь, что у вас есть метод getUsers в UserService
            console.log(response.data);
            this.setUsers(response.data);
        } catch (error) {
            console.error('Ошибка при получении пользователей:', error);
        }
    }


}
