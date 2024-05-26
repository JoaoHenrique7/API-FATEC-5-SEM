import React, { useState, useEffect, useMemo } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { View, Alert, Pressable, TextInput } from 'react-native';
import PartnerService from '../../../service/PartnerService';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ParamListBase } from "@react-navigation/native";
import { ThemeContextType } from '../../../contexts/ThemeContext/ThemeContext.context';
import useTheme from '../../../contexts/ThemeContext/useTheme.hook';
import styles from './Partners.style';
import { Partner } from '../../../types/definitions';
import { Text } from 'react-native';
import EditPartnerModal from '../../../components/EditPartnerModal/EditPartnerModal.component';

function PartnersScreen({ navigation }: StackScreenProps<ParamListBase>): React.JSX.Element {
    const { theme }: ThemeContextType = useTheme();
    const style = useMemo(() => styles(theme), [theme]);
    const [partners, setPartners] = useState<Partner[]>([]);
    const [search, setSearch] = useState('');
    const [filteredPartners, setFilteredPartners] = useState<Partner[]>([]);

    useEffect(() => {
        fetchPartners();
    }, []);

    useEffect(() => {
        if (search) {
            const newFilteredPartners = partners.filter(partner => 
                partner.name.toLowerCase().includes(search.toLowerCase()) ||
                partner.email.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredPartners(newFilteredPartners);
        } else {
            setFilteredPartners(partners);
        }
    }, [search, partners]);

    const fetchPartners = async () => {
        try {
            const data = await PartnerService.fetchPartners();
            setPartners(data);
        } catch (error) {
            console.error('Erro ao obter parceiros:', error);
        }
    };

    const deletePartner = async (id: string) => {
        try {
            await PartnerService.deletePartner(id);
            setPartners(partners.filter(partner => partner._id !== id));
        } catch (error) {
            console.error('Erro ao excluir parceiro:', error);
        }
    };

    const editPartnerModal = async (selectedPartner: Partner) => {
        setModalData(selectedPartner);
        setModalVisible(true);
        setEditionFlag(true);
        setModalTitle("Editar Parceiro");
    };

    const addPartnerModal = async () => {
        setModalData(null);
        setModalVisible(true);
        setEditionFlag(false);
        setModalTitle("Adicionar Parceiro");
    };

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [isEdition, setEditionFlag] = useState<boolean>(false);
    const [modalTitle, setModalTitle] = useState<string>("");
    const [modalData, setModalData] = useState<Partner | null>(null);

    const updateListAfterModalClose = async () => {
        fetchPartners();
        setModalVisible(false);
    };

    return (
        <View style={style.container}>
            <View style={style.events}>
                <Pressable onPress={() => addPartnerModal()} style={style.addButton}>
                    <MaterialCommunityIcons name='plus' size={16} />
                    <Text style={style.addButtonContent}>Adicionar parceiro</Text>
                </Pressable>
            </View>
            <TextInput
                style={style.searchInput}
                placeholder="Buscar parceiro..."
                value={search}
                onChangeText={(text) => setSearch(text)}
            />
            <View style={style.datalist}>
                {
                    filteredPartners.map((partner: Partner, key: number) => {
                        return (
                            <View key={key} style={style.item}>
                                <View style={style.itemData}>
                                    <Text style={style.mainData} numberOfLines={1}>{partner.name}</Text>
                                    <Text style={style.subData} numberOfLines={1}>{partner.email}</Text>
                                </View>
                                <View style={style.itemActions}>
                                    <Pressable style={style.edit} onPress={() => navigation.navigate('EditPartner', partner)}>
                                        <MaterialCommunityIcons name='pencil' size={24} />
                                    </Pressable>
                                    <Pressable style={style.delete} onPress={() => Alert.alert('Gestor de Parceiros', 'Deseja excluir este parceiro?', [{text: 'Não', onPress: () => console.log('Cancel pressed')}, {text: 'Sim', onPress: () => deletePartner(partner._id)}])}>
                                        <MaterialCommunityIcons name='trash-can' size={24} />
                                    </Pressable>
                                </View>
                            </View>
                        )
                    })
                }
            </View>
            {modalVisible && <EditPartnerModal partner={modalData} closeModal={() => updateListAfterModalClose()} visible={modalVisible} modalTitle={modalTitle} isEdition={isEdition} />}
        </View>
    );
};

export default PartnersScreen;