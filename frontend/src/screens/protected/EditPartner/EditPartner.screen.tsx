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
import BaseCertificatesService from "../../../service/BaseCertificatesService";
import { CheckBox, ListItem } from "@rneui/themed";

function EditPartnerScreen({ navigation, route }: StackScreenProps<ParamListBase>): React.JSX.Element {
    const { theme }: ThemeContextType = useTheme();
    const style = useMemo(() => styles(theme), [theme]);

    if (!route.params || !(route.params as Partner)) {
        navigation.goBack();
        return <></>;
    }

    const partner: Partner = route.params as Partner;

    const [formData, setFormData] = useState<Partner>(partner);
    const [tracks, setTracks] = useState<[string, { name: string, qualifiers: string[] }[]][]>([]);
    const [trackExpanded, setTrackExpanded] = useState<string | undefined>(undefined);
    const [expertiseExpanded, setExpertiseExpanded] = useState<string | undefined>(undefined);

    const nameRef = useRef<TextInput>(null);
    const emailRef = useRef<TextInput>(null);
    const documentRef = useRef<TextInput>(null);

    const handleTrackExpand = (selectedTrack: string) => {
        if (trackExpanded === selectedTrack) { setTrackExpanded(undefined); return; }
        setExpertiseExpanded(undefined);
        setTrackExpanded(selectedTrack);
    }

    const handleExpertiseExpand = (selectedExpertise: string) => {
        if (expertiseExpanded === selectedExpertise) { setExpertiseExpanded(undefined); return; }
        setExpertiseExpanded(selectedExpertise);
    }

    const addExpertisesToUser = (track: string, expertise: string, qualifier: string) => {
        const data = formData;
        let cert: BaseCertificate = {
            track: track,
            name: expertise,
            qualifiers: [ qualifier ]
        };

        const expertiseExists = data.expertises.find((e) => (e.track === track) && (e.name === expertise));

        if (!expertiseExists) {
            data.expertises.push(cert);
        } else {
            if (expertiseExists.qualifiers.includes(qualifier)) {
            } else {
                expertiseExists.qualifiers.push(qualifier);
                data.expertises = [
                    ...data.expertises,
                    expertiseExists
                ];
            }
        }


    }

    useEffect(() => {
        console.log(formData);
    }, [formData])

    useEffect(() => {
        const fetchCertificates = async () => {
            const response = await BaseCertificatesService.all();

            if ("message" in response) return;

            const tracksSet = new Set<string>();
            const tracks: { [key: string]: { name: string, qualifiers: string[] }[] } = {}

            for (const item of response) tracksSet.add(item.track);
            for (const track of tracksSet) {
                const expertisesWithTrack = response.filter((item) => item.track === track);

                if (!tracks[track]) tracks[track] = [];

                expertisesWithTrack.forEach((expertise) => {
                    tracks[track].push({ name: expertise.name, qualifiers: expertise.qualifiers });
                })
            }

            const tracksArray = Object.entries(tracks);

            setTracks(tracksArray);
        }

        fetchCertificates();
    }, [])

    return (
        <Screen>
            <Text>{JSON.stringify(formData)}</Text>
            <View style={style.header}>
                <Pressable style={style.goBack} onPress={navigation.goBack}>
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
                <View style={style.trackWrapper}>
                    <Text>Tracks & Expertises</Text>
                    {
                        tracks.map((track, key) => {
                            const currentTrack = track[0];
                            const expertisesList = track[1];
                            const isTrackExpanded = trackExpanded === currentTrack;

                            return (
                                <ListItem.Accordion
                                    key={key}
                                    content={
                                        <ListItem.Content>
                                            <ListItem.Title>
                                                {currentTrack}
                                            </ListItem.Title>
                                        </ListItem.Content>
                                    }
                                    isExpanded={isTrackExpanded}
                                    onPress={() => handleTrackExpand(currentTrack)}
                                    style={style.trackAccordion}
                                >
                                    {
                                        expertisesList.map((expertise, key) => {
                                            const isExpertiseExpanded = expertise.name === expertiseExpanded;
                                            const qualifiers = expertise.qualifiers;

                                            return (
                                                <ListItem.Accordion
                                                    key={key}
                                                    content={
                                                        <ListItem.Content>
                                                            <ListItem.Title>
                                                                {expertise.name}
                                                            </ListItem.Title>
                                                        </ListItem.Content>
                                                    }
                                                    isExpanded={isExpertiseExpanded}
                                                    onPress={() => handleExpertiseExpand(expertise.name)}
                                                    style={style.expertiseAccordion}
                                                >
                                                    <View style={style.expertiseAccordionContent}>
                                                        {
                                                            qualifiers.map((qualifier, key) => {
                                                                const isChecked = formData.expertises ? formData.expertises.filter((e) => {
                                                                    return e.qualifiers.includes(qualifier)
                                                                }).length > 0 : false;

                                                                return (
                                                                    <CheckBox
                                                                        key={key}
                                                                        onPress={() => addExpertisesToUser(currentTrack, expertise.name, qualifier)}
                                                                        checked={isChecked}
                                                                        title={qualifier}
                                                                    />
                                                                )
                                                            })
                                                        }
                                                    </View>
                                                </ListItem.Accordion>
                                            )
                                        })
                                    }
                                </ListItem.Accordion>
                            )
                        })
                    }
                </View>
            </View>
        </Screen>
    );
}

export default EditPartnerScreen