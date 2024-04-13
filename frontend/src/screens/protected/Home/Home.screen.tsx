import React, { useState, useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Text, View, Button, FlatList, TextInput } from 'react-native';
import { ListItem } from 'react-native-elements';
import uuid from 'uuid-random';
import UserService from '../../../service/UserService';
import Screen from '../../../components/Screen/Screen.component';

type RootStackParamList = {
  SignIn: undefined;
};

type Props = StackScreenProps<RootStackParamList, 'SignIn'>;

interface User {
  id: string;
  nome: string;
  email: string;
  senha: string;
  tipo: string;
  // Outros campos do usuário
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [addingUser, setAddingUser] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPass, setNewUserPass] = useState('');
  const [newUserType, setNewUserType] = useState('');

  useEffect(() => {
    // Ao montar o componente, busca os usuários
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await UserService.fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error('Erro ao obter usuários:', error);
    }
  };

  const toggleAddingUser = () => {
    setAddingUser(!addingUser);
  };

  const handleNameChange = (text: string) => {
    setNewUserName(text);
  };

  const handleEmailChange = (text: string) => {
    setNewUserEmail(text);
  };

  const handlePassChange = (text: string) => {
    setNewUserPass(text);
  };

  const handleTypeChange = (text: string) => {
    setNewUserType(text);
  };

  const addUser = async () => {
    const newUser: User = {
      id: uuid(),
      nome: newUserName,
      email: newUserEmail,
      senha: newUserPass,
      tipo: newUserType,
      // Outros campos do usuário
    };

    try {
      const data = await UserService.addUser(newUser);
      setUsers([...users, data]);
      setNewUserName(''); // Limpa o campo de entrada
      setNewUserEmail(''); // Limpa o campo de entrada
      setNewUserPass(''); // Limpa o campo de entrada
      setNewUserType(''); // Limpa o campo de entrada
      setAddingUser(false); // Fecha o campo de entrada
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await UserService.deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  };

  return (
    <Screen>
      <Text>Home</Text>
      <Button title="Sign out" onPress={() => navigation.replace('SignIn')} />
      <Button title="Adicionar Usuário" onPress={toggleAddingUser} />
      {addingUser && (
        <View>
          <TextInput
            placeholder="Nome do usuário"
            value={newUserName}
            onChangeText={handleNameChange}
          />
          <TextInput
            placeholder="Email do usuário"
            value={newUserEmail}
            onChangeText={handleEmailChange}
          />
          <TextInput
            placeholder="Senha do usuário"
            value={newUserPass}
            onChangeText={handlePassChange}
          />
          <TextInput
            placeholder="Tipo do usuário"
            value={newUserType}
            onChangeText={handleTypeChange}
          />
          <Button title="Salvar" onPress={addUser} />
        </View>
      )}
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item.nome}</ListItem.Title>
              {/* Outros campos do usuário */}
            </ListItem.Content>
            <Button title="Excluir" onPress={() => deleteUser(item.id)} />
          </ListItem>
        )}
      />
    </Screen>
  );
};

export default HomeScreen;
