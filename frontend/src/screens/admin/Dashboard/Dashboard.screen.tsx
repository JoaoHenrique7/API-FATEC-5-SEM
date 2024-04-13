import { ParamListBase } from "@react-navigation/native";
import { GestureResponderEvent, Text, View } from "react-native";
import ButtonWithLoading from "../../../components/ButtonWithLoading/ButtonWithLoading.component";
import { StackScreenProps } from "@react-navigation/stack";
import Screen from "../../../components/Screen/Screen.component";

function DashboardScreen({ navigation }: StackScreenProps<ParamListBase>): React.JSX.Element {
    function onPress(e: GestureResponderEvent) {
        e.preventDefault();

        navigation.replace('SignIn');
    }
    
    return (
        <Screen>
            <Text>Dashboard</Text>
            <ButtonWithLoading onPress={(e) => onPress(e)} label="Sair" />
        </Screen>
    )
}

export default DashboardScreen;