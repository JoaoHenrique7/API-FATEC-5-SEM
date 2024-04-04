import React from 'react';
import { View, Text } from 'react-native';
import { get } from '../services/apiServices'; // Importa a função get do serviço

import ButtonComponent from '../components/ButtonComponent'; // Importa o componente do botão

const HomeScreen: React.FC = () => {
  const chamarServico = async () => {
    try {
      const data = await get('/dados'); // Chama a função get do serviço para buscar dados
      console.log('Dados recebidos:', data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Tela Inicial</Text>
      <ButtonComponent onPress={chamarServico} /> {/* Renderiza o botão e passa a função chamarServico como callback */}
    </View>
  );
};

export default HomeScreen;
