import { ParamListBase } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { Text, View } from "react-native";
import ButtonWithLoading from "../../../components/ButtonWithLoading/ButtonWithLoading.component";
import Screen from "../../../components/Screen/Screen.component";

export default function HomeScreen({ navigation }: StackScreenProps<ParamListBase>): React.JSX.Element {
    return (
        <Screen>
            <Text>Home</Text>
            <ButtonWithLoading onPress={() => navigation.replace('SignIn')} label="Sign out" />
        </Screen>
    );
}