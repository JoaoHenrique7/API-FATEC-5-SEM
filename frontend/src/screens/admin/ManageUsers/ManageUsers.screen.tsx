import React, { useState, useEffect, useMemo } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { View, Alert, Pressable } from 'react-native';
import UserService from '../../../service/UserService';
import ListItem from 'react-native-elements/dist/list/ListItem';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ParamListBase } from "@react-navigation/native";
import { ThemeContextType } from '../../../contexts/ThemeContext/ThemeContext.context';
import useTheme from '../../../contexts/ThemeContext/useTheme.hook';
import styles from './ManageUsers.style';
import { User } from '../../../types/definitions';
import { Text } from 'react-native';
import EditUserModal from '../../../components/EditUserModal/EditUserModal.component';

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
    // const renderItem = ({ item }: { item: User }) => (
    //     <ListItem bottomDivider key={item._id}>
    //         <ListItem.Content>
    //         <ListItem.Title>{item.nome}</ListItem.Title>
    //         {/* Outros campos do usuário */}
    //         </ListItem.Content>
    //         <MaterialCommunityIcons onPress={() => editUserModal(item)} name="account-edit" size={30} color="black" />
    //         <MaterialCommunityIcons onPress={() => Alert.alert('Gestor de Parceiros', 'Deseja excluir este usuário?', [{text: 'Não', onPress: () => console.log('Cancel pressed')}, {text: 'Sim', onPress: () => deleteUser(item._id)}])} name="account-remove" size={30} color="black" />
    //     </ListItem>
    // );

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [isEdition, setEditionFlag] = useState<boolean>(false);
    const [modalTitle, setModalTitle] = useState<string>("");
    const [modalData, setModalData] = useState<User | null>(null);

    const updateListAfterModalClose = async () => {
        fetchUsers();
        setModalVisible(false);
    };

    return (
        <View style={style.container}>
            <View style={style.events}>
                <Pressable onPress={() => addUserModal()} style={style.addButton}>
                    <MaterialCommunityIcons name='plus' size={16} />
                    <Text style={style.addButtonContent}>Adicionar consultor</Text>
                </Pressable>
            </View>
            <View style={style.datalist}>
                {
                    users.map((user: User, key: number) => {
                        if (user.tipo === "0") return;
                        return (
                            <View key={key} style={style.item}>
                                <View style={style.itemData}>
                                    <Text style={style.mainData} numberOfLines={1}>{user.nome}</Text>
                                    <Text style={style.subData} numberOfLines={1}>{user.email}</Text>
                                </View>
                                <View style={style.itemActions}>
                                    <Pressable style={style.edit} onPress={() => editUserModal(user)}>
                                        <MaterialCommunityIcons name='pencil' size={24} />
                                    </Pressable>
                                    <Pressable style={style.delete} onPress={() => Alert.alert('Gestor de Parceiros', 'Deseja excluir este usuário?', [{text: 'Não', onPress: () => console.log('Cancel pressed')}, {text: 'Sim', onPress: () => deleteUser(user._id)}])}>
                                        <MaterialCommunityIcons name='trash-can' size={24} />
                                    </Pressable>
                                </View>
                            </View>
                        )
                    })
                }
            </View>
            {modalVisible && <EditUserModal user={modalData} closeModal={() => updateListAfterModalClose()} visible={modalVisible} modalTitle={modalTitle} isEdition={isEdition} />}
            {/* <View>
                <FlatList
                    data={users}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                />
                {modalVisible && <EditUserModal user={modalData} closeModal={() => updateListAfterModalClose()} visible={modalVisible} modalTitle={modalTitle} isEdition={isEdition} />}
                <MaterialCommunityIcons style={style.addButton} onPress={() => addUserModal()} name="account-plus" size={45} color="black" />
            </View> */}
        </View>
    );
};

export default ManageUsers;