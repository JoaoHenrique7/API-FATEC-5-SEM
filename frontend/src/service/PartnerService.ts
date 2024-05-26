import axios from 'axios';

const BASE_URL = 'http://192.168.138.87:3000/partners';

const PartnerService = {
  fetchPartners: async (): Promise<any[]> => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter parceiros:', error);
      throw error;
    }
  },

  addPartner: async (newPartner: any): Promise<any> => {
    try {
      const response = await axios.post(`${BASE_URL}/`, newPartner);
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar parceiro:', error);
      throw error;
    }
  },

  updatePartner: async (updatedPartnerData : any): Promise<any> => {
    try {
      const response = await axios.patch(`${BASE_URL}/${updatedPartnerData._id}`, updatedPartnerData);
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar parceiro:', error);
      throw error;
    }
  },

  deletePartner: async (id: string): Promise<void> => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
    } catch (error) {
      console.error('Erro ao excluir parceiro:', error);
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

export default PartnerService;
