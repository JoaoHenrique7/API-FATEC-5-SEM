import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ButtonComponent from './src/components/ButtonComponent';
import { getAll } from './src/services/apiServices';

export default function App() {

    const chamarServico = async () => {
        try {
          const data = await getAll('/'); // Chama a função get do serviço para buscar dados
          console.log('Dados recebidos:', data);
        } catch (error) {
          console.error('Erro ao buscar dados:', error);
        }
      };

    return (
        <View style={styles.container}>
            <Text>Open up App.tsx to start working on your app</Text>
            <ButtonComponent onPress={chamarServico} /> 
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
