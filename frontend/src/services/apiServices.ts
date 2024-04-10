import axios, { AxiosResponse } from 'axios';

// Defina a URL base do seu backend
// const baseURL = 'https://seu-backend.com/api';
const baseURL = 'http://localhost:3000/users';

// Crie uma instância do axios com a URL base
const api = axios.create({
  baseURL,
  timeout: 10000, // timeout de 10 segundos (opcional, pode ajustar conforme necessário)
});

// Função para fazer uma requisição GET
export const get = async <T>(url: string, params = {}): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.get(url, { params });
    return response.data;
  } catch (error) {
    throw error; // Lança o erro para ser tratado onde a função for chamada
  }
};

// Função para fazer uma requisição GET
export const getAll = async <T>(url: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.get(url);
    return response.data;
  } catch (error) {
    throw error; // Lança o erro para ser tratado onde a função for chamada
  }
};


// Função para fazer uma requisição POST
export const post = async <T>(url: string, data = {}): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.post(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Adicione outras funções conforme necessário para suportar outros métodos HTTP (PUT, DELETE, etc.)
