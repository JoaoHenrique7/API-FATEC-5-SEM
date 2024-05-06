import axios from 'axios';

// const BASE_URL = 'http://localhost:3000/users'; // rota correta antes do deploy na AWS
const BASE_URL = 'http://192.168.15.68:3000/users'; // IP do João

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

  updateUser: async (updatedUserData : any): Promise<any> => {
    try {
      const response = await axios.patch(`${BASE_URL}/${updatedUserData._id}`, updatedUserData);
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
  sendEmail: async(email: string): Promise<any> =>{
    try{
      const resp = await axios.post(`${BASE_URL}/sendEmail`, { email: email });
      return resp.data
    } catch (error){
      console.error('Erro ao mandar o email:', error);
      throw error;
    }
  },
  findByEmail: async(email: string): Promise<any> =>{
    try{
      const resp = await axios.post(`${BASE_URL}/findByEmail`, { emailReq: email });
      return resp.status
    } catch (error){
      return 0
      // console.error('Erro ao mandar o email:', error);
      // throw error;
    }
  },
  updatePasswordByEmail: async(email: string, newPassword: string):Promise<any> =>{
    try{
      const resp = await axios.post(`${BASE_URL}/updatePassword`, { emailReq: email, newPassword: newPassword });
      return resp.status
    } catch (error){
      console.error('Erro ao mudar a senha:', error);
      throw error;
    }
  }
};

export default UserService;
