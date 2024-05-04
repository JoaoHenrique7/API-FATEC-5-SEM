import React, { useState } from 'react';
import uuid from 'uuid-random';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native'
import PartnerService from '../../service/PartnerService';
import { Ionicons } from '@expo/vector-icons';
import { Partner } from '../../types/definitions';

interface Props {
    modalTitle: string,
    isEdition: boolean,
    partner: Partner | null;
    visible: boolean;
    closeModal: () => void;
}

const EditPartnerModal: React.FC<Props> = ({ visible, partner, closeModal, modalTitle, isEdition }) => {
    const [newPartnerName, setNewPartnerName] = useState(partner?.nome);
    const [newPartnerEmail, setNewPartnerEmail] = useState(partner?.email);
    const [newPartnerCpfCnpj, setNewPartnerCpfCnpj] = useState(partner?.cpfcnpj);
    const [newPartnerType, setNewPartnerType] = useState(partner?.tipo);
    // const [secureTextEntry, setSecureTextEntry] = useState(true);

    const handleNameChange = (text: string) => {
        setNewPartnerName(text);
    };

    const handleEmailChange = (text: string) => {
        setNewPartnerEmail(text);
    };

    const handleCpfCnpjChange = (text: string) => {
        setNewPartnerCpfCnpj(text);
    };

    const handleTypeChange = (text: string) => {
        setNewPartnerType(text);
    };

    const addPartner = async () => {
        const newPartner: Partner = {
            _id: uuid(),
            nome: newPartnerName!,
            email: newPartnerEmail!,
            cpfcnpj: newPartnerCpfCnpj!,
            tipo: '1',
            expertise: ''
        };


        try {
            console.log(newPartner.nome)
            if (newPartner.nome == undefined || newPartner.email == undefined || newPartner.cpfcnpj == undefined || newPartner.tipo == undefined){
                return Alert.alert('Gestor de Parceiros', 'Erro ao adicionar um consultor de alianças');
            } else {
                const data = await PartnerService.addPartner(newPartner);
                setNewPartnerName(''); // Limpa o campo de entrada
                setNewPartnerEmail(''); // Limpa o campo de entrada
                setNewPartnerCpfCnpj(''); // Limpa o campo de entrada
                setNewPartnerType(''); // Limpa o campo de entrada
    
                Alert.alert('Gestor de Parceiros', 'Consultor de aliança adicionado com sucesso!', [
                    {text: 'OK', onPress:closeModal},
                ]);
            }    
        } catch (error) {
            console.error('Erro ao adicionar parceiro:', error);
            Alert.alert('Gestor de Parceiros', 'Erro ao adicionar um consultor de alianças');
        }
    };

    const editPartner = async () => {

        partner!.nome = newPartnerName!;
        partner!.email = newPartnerEmail!;
        partner!.cpfcnpj = newPartnerCpfCnpj!;
        try {
            await PartnerService.updatePartner(partner);
            Alert.alert('Gestor de Parceiros', 'As informações foram atualizadas com sucesso!', [
                {text: 'OK', onPress:closeModal},
            ]);

        } catch (error) {
            console.error('Erro ao atualizar o parceiro:', error);
        }
    };

    return (
        <Modal visible={visible} animationType="slide">
            <View style={styles.container}>
                <View style={styles.modal}>
                    <Text style={styles.title}>{modalTitle}</Text>

                    <Text style={styles.label}>Nome</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome do parceiro"
                        value={newPartnerName}
                        onChangeText={handleNameChange}
                    />

                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email do parceiro"
                        value={newPartnerEmail}
                        onChangeText={handleEmailChange}
                    />

                    <Text style={styles.label}>CPF/CNPJ</Text>
                    <View style={{ display: 'flex' }}>
                        <TextInput
                            style={styles.input}
                            placeholder="CPF/CNPJ"
                            value={newPartnerCpfCnpj}
                            onChangeText={handleCpfCnpjChange}
                        />
                    </View>

                    <View style={styles.containerBtn} >
                        <TouchableOpacity style={styles.closeBtn} onPress={closeModal}>
                            <Text style={{ color: '#fff' }}>Fechar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.saveBtn} onPress={isEdition ? editPartner : addPartner}>
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

export default EditPartnerModal