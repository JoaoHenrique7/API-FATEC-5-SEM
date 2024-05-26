import { ParamListBase } from "@react-navigation/native";
import { GestureResponderEvent, Text, View } from "react-native";
import ButtonWithLoading from "../../../components/ButtonWithLoading/ButtonWithLoading.component";
import { StackScreenProps } from "@react-navigation/stack";
import Screen from "../../../components/Screen/Screen.component";
import useSession from "../../../contexts/SessionContext/useSession.hook";
import DashboardComponent from "../components/dashboardComponents/dashboard.component";

function DashboardScreen({ navigation }: StackScreenProps<ParamListBase>): React.JSX.Element {
    const { logout } = useSession();

    function onPress(e: GestureResponderEvent) {
        e.preventDefault();

        logout();
        navigation.replace('SignIn');
    }
    
    return (
        <Screen>
            {/* <Text>Dashboard</Text> */}
            {/* <ButtonWithLoading onPress={(e) => onPress(e)} label="Sair" /> */}
            <DashboardComponent />
        </Screen>
    )
}

export default DashboardScreen;