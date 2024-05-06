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
import { Partner } from "../../../types/definitions";
import TextInputGroup from "../../../components/TextInputGroup/TextInputGroup.component";
import { CheckBox, ListItem } from "@rneui/themed";
import PartnerService from "../../../service/PartnerService";
import useSession from "../../../contexts/SessionContext/useSession.hook";

function EditPartnerScreen({ navigation, route }: StackScreenProps<ParamListBase>): React.JSX.Element {
    const { theme }: ThemeContextType = useTheme();
    const style = useMemo(() => styles(theme), [theme]);
    const { check, session } = useSession();

    if (!route.params || !(route.params as Partner)) {
        navigation.goBack();
        return <></>;
    }

    const partner: Partner = route.params as Partner;

    const [formData, setFormData] = useState<Partner>(partner);
    const [tracks, setTracks] = useState<[string, { name: string, qualifiers: string[] }[]][]>([
        ["Cloud Sell Track", [
            { name: "B2B/B2C Field Service", qualifiers: ["Sales Specialists*", "Solutions Engineers*"] },
            { name: "B2B Marketing", qualifiers: ["Sales Specialists*", "Solutions Engineers*"] },
            { name: "B2C Marketing", qualifiers: ["Sales Specialists*", "Solutions Engineers*"] }
        ]],
        ["Cloud Build Track", [
            { name: "Powered by Oracle Autonomous Database Cloud", qualifiers: ["Oracle Cloud Marketplace", "Public Support for Oracle Cloud"] },
            { name: "Powered by Oracle Exadata Cloud", qualifiers: ["Oracle Cloud Marketplace", "Public Support for Oracle Cloud"] }
        ]]
    ]);
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

    const addExpertisesToUser = async (track: string, expertise: string, qualifier: string) => {
        const part: Partner = {
            _id: partner._id,
            cpfcnpj: formData.cpfcnpj,
            email: formData.email,
            name: formData.name,
            tipo: partner.tipo,
            expertises: [
                { name: "B2B/B2C Field Service", qualifiers: ["Sales Specialists*", "Solutions Engineers*"], track: "Cloud Sell Track" },
            ]
        }

        await PartnerService.updatePartner(part);
    }

    useEffect(() => {
        // const fetchCertificates = async () => {
        //     const response = await BaseCertificatesService.all();

        //     if ("message" in response) return;

        //     const tracksSet = new Set<string>();
        //     const tracks: { [key: string]: { name: string, qualifiers: string[] }[] } = {}

        //     for (const item of response) tracksSet.add(item.track);
        //     for (const track of tracksSet) {
        //         const expertisesWithTrack = response.filter((item) => item.track === track);

        //         if (!tracks[track]) tracks[track] = [];

        //         expertisesWithTrack.forEach((expertise) => {
        //             tracks[track].push({ name: expertise.name, qualifiers: expertise.qualifiers });
        //         })
        //     }

        //     const tracksArray = Object.entries(tracks);

        //     setTracks(tracksArray);
        // }

        // fetchCertificates();
    }, [formData])

    return (
        <Screen>
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
                                                                const isFirst = (currentTrack === "Cloud Sell Track") && (expertise.name === "B2B/B2C Field Service") && (qualifier === "Sales Specialists*");
                                                                const isSecond = (currentTrack === "Cloud Sell Track") && (expertise.name === "B2B/B2C Field Service") && (qualifier === "Solutions Engineers*");

                                                                return (
                                                                    <CheckBox
                                                                        key={key}
                                                                        onPress={() => {
                                                                            addExpertisesToUser(currentTrack, expertise.name, qualifier);

                                                                            if (isFirst) {
                                                                                check([!session.check[0], session.check[1]])
                                                                            } else if (isSecond) {
                                                                                check([session.check[0], !session.check[1]])
                                                                            }
                                                                        }}
                                                                        checked={
                                                                            (isFirst && session.check[0] === true) ? true
                                                                                : (isSecond && session.check[1] === true) ? true : false
                                                                        }
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