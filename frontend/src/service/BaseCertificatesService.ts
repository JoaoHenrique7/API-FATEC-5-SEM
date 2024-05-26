import axios from "axios";
import { BaseCertificate } from "../types/definitions";

const BASE_URL = 'http://192.168.138.87:3000';

const BaseCertificatesService = {
    all: async () => {
        try {
            const response = await axios.get<BaseCertificate[] | { message: string }>(`${BASE_URL}/baseCertificate/`);
            return response.data;
        } catch (error) {
            return { message: 'Falha ao obter certificados' }
        }
    }
}

export default BaseCertificatesService;