import React, { useState, useEffect, useMemo } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { View, Alert, Pressable } from 'react-native';
import PartnerService from '../../../service/PartnerService';
import ListItem from 'react-native-elements/dist/list/ListItem';
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

    useEffect(() => {
        fetchPartners();
    }, []);

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

    // Render each item in the list
    // const renderItem = ({ item }: { item: Partner }) => (
    //     <ListItem bottomDivider key={item._id}>
    //         <ListItem.Content>
    //         <ListItem.Title>{item.nome}</ListItem.Title>
    //         {/* Outros campos do parceiro */}
    //         </ListItem.Content>
    //         <MaterialCommunityIcons onPress={() => editPartnerModal(item)} name="account-edit" size={30} color="black" />
    //         <MaterialCommunityIcons onPress={() => Alert.alert('Gestor de Parceiros', 'Deseja excluir este parceiro?', [{text: 'Não', onPress: () => console.log('Cancel pressed')}, {text: 'Sim', onPress: () => deletePartner(item._id)}])} name="account-remove" size={30} color="black" />
    //     </ListItem>
    // );

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
            <View style={style.datalist}>
                {
                    partners.map((partner: Partner, key: number) => {
                        if (partner.tipo === "0") return;
                        return (
                            <View key={key} style={style.item}>
                                <View style={style.itemData}>
                                    <Text style={style.mainData} numberOfLines={1}>{partner.nome}</Text>
                                    <Text style={style.subData} numberOfLines={1}>{partner.email}</Text>
                                </View>
                                <View style={style.itemActions}>
                                    <Pressable style={style.edit} onPress={() => editPartnerModal(partner)}>
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
            {/* <View>
                <FlatList
                    data={partners}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                />
                {modalVisible && <EditPartnerModal partner={modalData} closeModal={() => updateListAfterModalClose()} visible={modalVisible} modalTitle={modalTitle} isEdition={isEdition} />}
                <MaterialCommunityIcons style={style.addButton} onPress={() => addPartnerModal()} name="account-plus" size={45} color="black" />
            </View> */}
        </View>
    );
};

export default PartnersScreen;