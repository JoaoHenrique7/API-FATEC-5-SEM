import React, { useEffect, useMemo, useState } from "react";
import { ParamListBase } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import Screen from "../../../components/Screen/Screen.component";
import { ScrollView, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./EditPartner.style";
import useTheme from "../../../contexts/ThemeContext/useTheme.hook";
import { ThemeContextType } from "../../../contexts/ThemeContext/ThemeContext.context";
import { BaseCertificate, Partner } from "../../../types/definitions";
import BaseCertificatesService from "../../../service/BaseCertificatesService";
import { CheckBox } from "@rneui/base";
import PartnerService from "../../../service/PartnerService";


function EditPartnerTracksScreen({ navigation, route }: StackScreenProps<ParamListBase>): React.JSX.Element {
    const { theme }: ThemeContextType = useTheme();
    const style = useMemo(() => styles(theme), [theme]);
    
    const [expertises, setExpertises] = useState<Omit<BaseCertificate, "track">[]>([]);
    
    if (!route.params || !(route.params as { track: string })) {
        navigation.goBack();
        return <></>;
    }
        
    let { track, partner } = (route.params as { track: string, partner: Partner });

    const [checked, setChecked] = useState<BaseCertificate[]>(partner.expertises || []);

    function save(expertise: string, qualifier: string) {
        const hasExpertise = checked.find(exp => exp.name === expertise);

        if (hasExpertise) {
            const hasQualifier = hasExpertise.qualifiers.find(qual => qual === qualifier);
            
            if (hasQualifier) {
                let selectedExpertise = checked.find(exp => exp.name === expertise)!;
                selectedExpertise.qualifiers = selectedExpertise.qualifiers.filter(qual => qual !== qualifier);
                
                let checkedExpertisesWithoutSelected = checked.filter(exp => exp.name !== expertise);

                setChecked([...checkedExpertisesWithoutSelected, selectedExpertise]);
            } else {
                let selectedExpertise = checked.find(exp => exp.name === expertise)!;
                selectedExpertise.qualifiers.push(qualifier);

                let checkedExpertisesWithoutSelected = checked.filter(exp => exp.name !== expertise); 
                
                setChecked([...checkedExpertisesWithoutSelected, selectedExpertise]);
            }
        } else {
            setChecked([...checked, { name: expertise, qualifiers: [qualifier], track }]);
        }
    }

    async function updateExpertise() {
        await PartnerService.updatePartnerExpertise(partner._id, { expertises: checked });
    }

    function isChecked(expertise: string, qualifier: string): boolean {
        const hasExpertise = checked.find(exp => exp.name === expertise);

        if (hasExpertise) {
            const hasQualifier = hasExpertise.qualifiers.find(qual => qual === qualifier);

            if (hasQualifier) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    useEffect(() => {
        partner.expertises = checked;
    }, [checked])

    useEffect(() => {
        const getTracks = async () => {
            const response: BaseCertificate[] | { message: string } = await BaseCertificatesService.all();

            if ("message" in response) return;

            const expertisesByTrack = response
                .filter(exp => exp.track === track)
                .map(exp => ({ name: exp.name, qualifiers: exp.qualifiers }));
            
            setExpertises(expertisesByTrack);
        }

        getTracks();
    }, [])

    return (
        <Screen>
            <TouchableOpacity onPress={() => {
                navigation.navigate("EditPartner", partner);
            }} style={style.goBack}>
                <MaterialCommunityIcons name="arrow-left" />
                <Text>Voltar</Text>
            </TouchableOpacity>
            <ScrollView style={style.expertisesView}>
                <Text style={style.track}>{track}</Text>
                {expertises.length > 0 && (
                    <TouchableOpacity style={style.saveBtn} onPress={updateExpertise}>
                        <Text style={style.btnText}>Salvar alterações</Text>
                    </TouchableOpacity>
                )}
                {expertises.length <= 0 && <Text>Carregando...</Text>}
                {expertises.map((expertise, key) => (
                    <React.Fragment key={key}>
                        <Text style={style.expertiseName}>{expertise.name}</Text>
                        {expertise.qualifiers.map((qualifier, key) => (
                            <CheckBox
                                key={key}
                                style={style.checkbox}
                                containerStyle={style.checkContainer}
                                checked={isChecked(expertise.name, qualifier)}
                                onPress={() => save(expertise.name, qualifier)}
                                title={qualifier}
                            />
                        ))}
                    </React.Fragment>
                ))}
            </ScrollView>
        </Screen>
    )
}

export default EditPartnerTracksScreen