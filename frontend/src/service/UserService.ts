// const BASE_URL = 'http://localhost:3000/users';

// const UserService = {
//   fetchUsers: async (): Promise<any[]> => {
//     try {
//       return await makeRequest(`${BASE_URL}/`, 'GET');
//     } catch (error) {
//       console.error('Erro ao obter usuários:', error);
//       throw error;
//     }
//   },

//   addUser: async (newUser: any): Promise<any> => {
//     try {
//       return await makeRequest(`${BASE_URL}/`, 'POST', newUser);
//     } catch (error) {
//       console.error('Erro ao adicionar usuário:', error);
//       throw error;
//     }
//   },

//   deleteUser: async (id: string): Promise<void> => {
//     try {
//       await makeRequest(`${BASE_URL}/${id}`, 'DELETE');
//     } catch (error) {
//       console.error('Erro ao excluir usuário:', error);
//       throw error;
//     }
//   },
// };

// const makeRequest = async (url: string, method: string, body?: any): Promise<any> => {
//   const options: RequestInit = {
//     method,
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };

//   if (body) {
//     options.body = JSON.stringify(body);
//   }

//   const response = await fetch(url, options);

//   if (!response.ok) {
//     throw new Error(`Erro na requisição: ${response.statusText}`);
//   }

//   return response.json();
// };

// export default UserService;



import axios from 'axios';

// const BASE_URL = 'http://localhost:3000/users'; // rota correta antes do deploy na AWS
const BASE_URL = 'http://192.168.15.11:3000/users'; // IP do João

const UserService = {
  fetchUsers: async (): Promise<any[]> => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter usuários:', error);
      throw error;
    }
  },

  addUser: async (newUser: any): Promise<any> => {
    try {
      const response = await axios.post(`${BASE_URL}/`, newUser);
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
      throw error;
    }
  },

  deleteUser: async (id: string): Promise<void> => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      throw error;
    }
  },
};

export default UserService;
