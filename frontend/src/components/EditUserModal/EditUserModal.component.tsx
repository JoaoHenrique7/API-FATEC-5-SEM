import React, { useState } from 'react';
import uuid from 'uuid-random';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native'
import UserService from '../../service/UserService';
import { Ionicons } from '@expo/vector-icons';
import { User } from '../../types/definitions';

interface Props {
    modalTitle: string,
    isEdition: boolean,
    user: User | null;
    visible: boolean;
    closeModal: () => void;
}

const EditUserModal: React.FC<Props> = ({ visible, user, closeModal, modalTitle, isEdition }) => {
    const [newUserName, setNewUserName] = useState(user?.nome);
    const [newUserEmail, setNewUserEmail] = useState(user?.email);
    const [newUserPass, setNewUserPass] = useState(user?.senha);
    const [newUserType, setNewUserType] = useState(user?.tipo);
    const [secureTextEntry, setSecureTextEntry] = useState(true);

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
            _id: uuid(),
            nome: newUserName!,
            email: newUserEmail!,
            senha: newUserPass!,
            tipo: '1',
        };


        try {
            console.log(newUser.nome)
            if (newUser.nome == undefined || newUser.email == undefined || newUser.senha == undefined || newUser.tipo == undefined){
                return Alert.alert('Gestor de Parceiros', 'Erro ao adicionar um consultor de alianças');
            } else {
                const data = await UserService.addUser(newUser);
                setNewUserName(''); // Limpa o campo de entrada
                setNewUserEmail(''); // Limpa o campo de entrada
                setNewUserPass(''); // Limpa o campo de entrada
                setNewUserType(''); // Limpa o campo de entrada
    
                Alert.alert('Gestor de Parceiros', 'Consultor de aliança adicionado com sucesso!', [
                    {text: 'OK', onPress:closeModal},
                ]);
            }    
        } catch (error) {
            console.error('Erro ao adicionar usuário:', error);
            Alert.alert('Gestor de Parceiros', 'Erro ao adicionar um consultor de alianças');
        }
    };

    const editUser = async () => {

        user!.nome = newUserName!;
        user!.email = newUserEmail!;
        user!.senha = newUserPass!;
        try {
            await UserService.updateUser(user);
            Alert.alert('Gestor de Parceiros', 'As informações foram atualizadas com sucesso!', [
                {text: 'OK', onPress:closeModal},
            ]);

        } catch (error) {
            console.error('Erro ao atualizar o usuário:', error);
        }
    };

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    return (
        <Modal visible={visible} animationType="slide">
            <View style={styles.container}>
                <View style={styles.modal}>
                    <Text style={styles.title}>{modalTitle}</Text>

                    <Text style={styles.label}>Nome</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome do usuário"
                        value={newUserName}
                        onChangeText={handleNameChange}
                    />

                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email do usuário"
                        value={newUserEmail}
                        onChangeText={handleEmailChange}
                    />

                    <Text style={styles.label}>Senha</Text>
                    <View style={{ display: 'flex' }}>
                        <TextInput
                            secureTextEntry={secureTextEntry}
                            style={styles.input}
                            placeholder="Senha do usuário"
                            value={newUserPass}
                            onChangeText={handlePassChange}
                        />
                         <TouchableOpacity onPress={toggleSecureEntry}>
                            <Ionicons name={secureTextEntry ? 'eye-off' : 'eye'} size={24} color="black" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.containerBtn} >
                        <TouchableOpacity style={styles.closeBtn} onPress={closeModal}>
                            <Text style={{ color: '#fff' }}>Fechar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.saveBtn} onPress={isEdition ? editUser : addUser}>
                            <Text style={{ color: '#fff' }}>{isEdition ? 'Atualizar' : 'Salvar'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '30%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute'
    },
    modal: {
        bottom: 0,
        position: 'absolute',
        height: '50%',
        backgroundColor: '#fff',
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingLeft: 25,
        paddingRight: 25
    },
    indicator: {
        width: 50,
        height: 5,
        backgroundColor: '#ccc',
        borderRadius: 50,
        alignSelf: 'center',
        marginTop: 5
    },
    text: {
        marginTop: 50,
        textAlign: 'center'
    },
    saveBtn: {
        width: '50%',
        height: 50,
        borderRadius: 10,
        backgroundColor: '#C74634',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    closeBtn: {
        width: '50%',
        height: 50,
        borderRadius: 10,
        backgroundColor: '#615e5b',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    containerBtn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 15,
    },
    label: {
        color: '#161616',
        textTransform: 'uppercase',
        fontSize: 12,
    },
    input: {
        backgroundColor: '#DCDCDC',
        borderWidth: 1,
        borderColor: '#C3C3C3',
        color: '#161616',
        borderRadius: 4,
        padding: 8,
        height: 44,
        marginBottom: 10
    },
    title: {
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        color: '#161616',
        fontSize: 24
    }
})

export default EditUserModal