import React from "react";
import { ParamListBase } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import Screen from "../../../components/Screen/Screen.component";
import { Pressable, Text, TextInput, View } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import useTheme from "../../../contexts/ThemeContext/useTheme.hook";
import { ThemeContextType } from "../../../contexts/ThemeContext/ThemeContext.context";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./EditPartner.style";
import { BaseCertificate, Partner } from "../../../types/definitions";
import TextInputGroup from "../../../components/TextInputGroup/TextInputGroup.component";
import PartnerService from "../../../service/PartnerService";
import ButtonWithLoading from "../../../components/ButtonWithLoading/ButtonWithLoading.component";
import BaseCertificatesService from "../../../service/BaseCertificatesService";
import { TouchableOpacity } from "react-native-gesture-handler";

function EditPartnerScreen({ navigation, route }: StackScreenProps<ParamListBase>): React.JSX.Element {
    const { theme }: ThemeContextType = useTheme();
    const style = useMemo(() => styles(theme), [theme]);

    if (!route.params || !(route.params as Partner)) {
        navigation.replace("Parceiros");
        return <></>;
    }

    let partner: Partner = route.params as Partner;

    const [formData, setFormData] = useState<Partner>(partner);
    const [tracks, setTracks] = useState<string[]>([]);

    const nameRef = useRef<TextInput>(null);
    const emailRef = useRef<TextInput>(null);
    const documentRef = useRef<TextInput>(null);

    const addExpertisesToUser = async () => {
        const part: Omit<Partner, "name" | "expertises"> & { nome: string } = {
            _id: partner._id,
            cpfcnpj: formData.cpfcnpj,
            email: formData.email,
            nome: formData.name,
            tipo: partner.tipo
        }

        await PartnerService.updatePartner(part);
    }

    async function onGoBack() {
        try {
            const data: Partner[] = await PartnerService.fetchPartners();

            const refreshedPartner = data.find(part => part._id === partner._id);
            partner = refreshedPartner!;
            setFormData(partner);
        } catch (error) {
            console.error('Erro ao obter parceiros:', error);
        }
    }

    useEffect(() => {
        const getTracks = async () => {
            const response: BaseCertificate[] | { message: string } = await BaseCertificatesService.all();

            if ("message" in response) return;

            const uniqueTracks = new Set<string>();

            for (const certificate of response) {
                uniqueTracks.add(certificate.track);
            }

            setTracks(Array.from(uniqueTracks));
        }

        getTracks();
    }, [formData])

    return (
        <Screen>
            <View style={style.header}>
                <Pressable style={style.goBack} onPress={() => navigation.replace("UserTabRoutes")}>
                    <MaterialCommunityIcons name='arrow-left' size={18} />
                    <Text>Voltar</Text>
                </Pressable>
                <View style={style.title}>
                    <MaterialCommunityIcons name="pencil" size={24} />
                    <Text style={style.titleText}>Edição de parceiro:</Text>
                </View>
            </View>
            <View style={ style.form }>
                <TextInputGroup
                    label="Nome"
                    onChangeText={(value) => setFormData((prev) => ({ ...prev, name: value }))}
                    input={{ defaultValue: formData.name }}
                    forwardRef={nameRef}
                />
                <TextInputGroup
                    label="Email"
                    onChangeText={(value) => setFormData((prev) => ({ ...prev, email: value }))}
                    input={{ defaultValue: formData.email }}
                    forwardRef={emailRef}
                />
                <TextInputGroup
                    label="Documento"
                    onChangeText={(value) => setFormData((prev) => ({ ...prev, cpfcnpj: value }))}
                    input={{ defaultValue: formData.cpfcnpj }}
                    forwardRef={documentRef}
                />
                <ButtonWithLoading label="Salvar alterações" onPress={() => addExpertisesToUser()} />
                <View style={style.trackWrapper}>
                    <Text style={style.tracktitle}>Tracks & Expertises</Text>
                    {tracks.map((track, key) => (
                        <TouchableOpacity onPress={() => navigation.navigate('EditPartnerTracks', { track, partner })} style={style.trackBtn} key={key}>
                            <Text>{track}</Text>
                            <MaterialCommunityIcons name="open-in-app" />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </Screen>
    );
}

export default EditPartnerScreen