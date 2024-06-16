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
import { BaseCertificate } from "../../../types/definitions";
import BaseCertificatesService from "../../../service/BaseCertificatesService";
import { CheckBox } from "@rneui/base";


function EditPartnerTracksScreen({ navigation, route }: StackScreenProps<ParamListBase>): React.JSX.Element {
    const { theme }: ThemeContextType = useTheme();
    const style = useMemo(() => styles(theme), [theme]);
    
    const [expertises, setExpertises] = useState<Omit<BaseCertificate, "track">[]>([]);

    if (!route.params || !(route.params as { track: string })) {
        navigation.goBack();
        return <></>;
    }

    const { track } = (route.params as { track: string });

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
            <TouchableOpacity onPress={() => navigation.goBack()} style={style.goBack}>
                <MaterialCommunityIcons name="arrow-left" />
                <Text>Voltar</Text>
            </TouchableOpacity>
            <ScrollView style={style.expertisesView}>
                <Text style={style.track}>{track}</Text>
                {expertises.length > 0 && (
                    <TouchableOpacity style={style.saveBtn}>
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
                                checked={false}
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