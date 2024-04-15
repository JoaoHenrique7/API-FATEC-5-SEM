// import React, { useState, useEffect } from 'react';
// import { StackScreenProps } from '@react-navigation/stack';
// import { Text, View, Button, FlatList, TextInput } from 'react-native';
// import { ListItem } from 'react-native-elements';
// import uuid from 'uuid-random';
// import UserService from '../../../service/UserService';
// import Screen from '../../../components/Screen/Screen.component';

// type RootStackParamList = {
//   SignIn: undefined;
// };

// type Props = StackScreenProps<RootStackParamList, 'SignIn'>;

// interface User {
//   id: string;
//   nome: string;
//   email: string;
//   senha: string;
//   tipo: string;
//   // Outros campos do usuário
// }

// const HomeScreen: React.FC<Props> = ({ navigation }) => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [addingUser, setAddingUser] = useState(false);
//   const [newUserName, setNewUserName] = useState('');
//   const [newUserEmail, setNewUserEmail] = useState('');
//   const [newUserPass, setNewUserPass] = useState('');
//   const [newUserType, setNewUserType] = useState('');

//   useEffect(() => {
//     // Ao montar o componente, busca os usuários
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const data = await UserService.fetchUsers();
//       setUsers(data);
//     } catch (error) {
//       console.error('Erro ao obter usuários:', error);
//     }
//   };

//   const toggleAddingUser = () => {
//     setAddingUser(!addingUser);
//   };

//   const handleNameChange = (text: string) => {
//     setNewUserName(text);
//   };

//   const handleEmailChange = (text: string) => {
//     setNewUserEmail(text);
//   };

//   const handlePassChange = (text: string) => {
//     setNewUserPass(text);
//   };

//   const handleTypeChange = (text: string) => {
//     setNewUserType(text);
//   };

//   const addUser = async () => {
//     const newUser: User = {
//       id: uuid(),
//       nome: newUserName,
//       email: newUserEmail,
//       senha: newUserPass,
//       tipo: newUserType,
//       // Outros campos do usuário
//     };

//     try {
//       const data = await UserService.addUser(newUser);
//       setUsers([...users, data]);
//       setNewUserName(''); // Limpa o campo de entrada
//       setNewUserEmail(''); // Limpa o campo de entrada
//       setNewUserPass(''); // Limpa o campo de entrada
//       setNewUserType(''); // Limpa o campo de entrada
//       setAddingUser(false); // Fecha o campo de entrada
//     } catch (error) {
//       console.error('Erro ao adicionar usuário:', error);
//     }
//   };

//   const deleteUser = async (id: string) => {
//     try {
//       await UserService.deleteUser(id);
//       setUsers(users.filter(user => user.id !== id));
//     } catch (error) {
//       console.error('Erro ao excluir usuário:', error);
//     }
//   };

//   return (
//     <Screen>
//       <Text>Home</Text>
//       <Button title="Sign out" onPress={() => navigation.replace('SignIn')} />
//       <Button title="Adicionar Usuário" onPress={toggleAddingUser} />
//       {addingUser && (
//         <View>
//           <TextInput
//             placeholder="Nome do usuário"
//             value={newUserName}
//             onChangeText={handleNameChange}
//           />
//           <TextInput
//             placeholder="Email do usuário"
//             value={newUserEmail}
//             onChangeText={handleEmailChange}
//           />
//           <TextInput
//             placeholder="Senha do usuário"
//             value={newUserPass}
//             onChangeText={handlePassChange}
//           />
//           <TextInput
//             placeholder="Tipo do usuário"
//             value={newUserType}
//             onChangeText={handleTypeChange}
//           />
//           <Button title="Salvar" onPress={addUser} />
//         </View>
//       )}
//       <FlatList
//         data={users}
//         keyExtractor={item => item.id}
//         renderItem={({ item }) => (
//           <ListItem bottomDivider>
//             <ListItem.Content>
//               <ListItem.Title>{item.nome}</ListItem.Title>
//               {/* Outros campos do usuário */}
//             </ListItem.Content>
//             <Button title="Excluir" onPress={() => deleteUser(item.id)} />
//           </ListItem>
//         )}
//       />
//     </Screen>
//   );
// };

// export default HomeScreen;



import React, { useState, useEffect, useMemo } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { View, FlatList, Alert } from 'react-native';
import UserService from '../../../service/UserService';
import ListItem from 'react-native-elements/dist/list/ListItem';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import EditUserModal from '../../../components/EditUserModal/EditUserModal.component';
import { ParamListBase } from "@react-navigation/native";
import { ThemeContextType } from '../../../contexts/ThemeContext/ThemeContext.context';
import useTheme from '../../../contexts/ThemeContext/useTheme.hook';
import styles from './Home.style';

interface User {
  _id: string;
  nome: string;
  email: string;
  senha: string;
  tipo: string;
}

function HomeScreen({ navigation }: StackScreenProps<ParamListBase>): React.JSX.Element {
  const { theme }: ThemeContextType = useTheme();
  const style = useMemo(() => styles(theme), [theme]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
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

  const deleteUser = async (id: string) => {
    try {
      await UserService.deleteUser(id);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  };

  const editUserModal = async (selectedUser: User) => {
    setModalData(selectedUser);
    setModalVisible(true);
    setEditionFlag(true);
    setModalTitle("Editar Consultor de Alianças");
  };

  const addUserModal = async () => {
    setModalData(null);
    setModalVisible(true);
    setEditionFlag(false);
    setModalTitle("Adicionar Consultor de Alianças");
  };

  // Render each item in the list
  const renderItem = ({ item }: { item: User }) => (
    <ListItem bottomDivider key={item._id}>
      <ListItem.Content>
        <ListItem.Title>{item.nome}</ListItem.Title>
        {/* Outros campos do usuário */}
      </ListItem.Content>
      <MaterialCommunityIcons onPress={() => editUserModal(item)} name="account-edit" size={30} color="black" />
      <MaterialCommunityIcons onPress={() => Alert.alert('Gestor de Parceiros', 'Deseja excluir este usuário?', [{text: 'Não', onPress: () => console.log('Cancel pressed')}, {text: 'Sim', onPress: () => deleteUser(item._id)}])} name="account-remove" size={30} color="black" />
    </ListItem>
  );

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isEdition, setEditionFlag] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalData, setModalData] = useState<User | null>(null);

  const updateListAfterModalClose = async () => {
    fetchUsers();
    setModalVisible(false);
  };

  return (
    <View>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
      {modalVisible && <EditUserModal user={modalData} closeModal={() => updateListAfterModalClose()} visible={modalVisible} modalTitle={modalTitle} isEdition={isEdition} />}
      <MaterialCommunityIcons style={style.addButton} onPress={() => addUserModal()} name="account-plus" size={45} color="black" />
    </View>
  );
};

export default HomeScreen;
