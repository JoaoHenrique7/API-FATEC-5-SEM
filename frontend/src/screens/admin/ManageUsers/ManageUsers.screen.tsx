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
import styles from './ManageUsers.style';
import { User } from '../../../types/definitions';

function ManageUsers({ navigation }: StackScreenProps<ParamListBase>): React.JSX.Element {
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

export default ManageUsers;