import axios from "axios";
import { User } from "../types/definitions";

// const IP = '192.168.15.2'
// const BASE_URL = `http://${IP}:3000`;

const BASE_URL = 'http://192.168.15.2:3000';

const AuthService = {
    login: async (email: string, senha: string): Promise<User | { message: string }> => {
        try {
            const response = await axios.post<User | { message: string }>(`${BASE_URL}/users/login`, { email, senha });
            return response.data;
        } catch (error) {
            return { message: 'Falha ao realizar o login' }
        }
    }
}

export default AuthService;