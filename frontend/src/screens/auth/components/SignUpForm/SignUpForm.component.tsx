import { SafeAreaView, Text, View } from "react-native";
import ButtonWithLoading from "../../../../components/ButtonWithLoading/ButtonWithLoading.component";
import TextInputGroup from "../../../../components/TextInputGroup/TextInputGroup.component";
import { Link, ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useMemo } from "react";
import useTheme from "../../../../contexts/ThemeContext/useTheme.hook";
import { ThemeContextType } from "../../../../contexts/ThemeContext/ThemeContext.context";
import styles from "./SignUpForm.style";
import AuthFooter from "../AuthFooter/AuthFooter.component";

type FormProps = {
    navigation: StackNavigationProp<ParamListBase, string, undefined>;
}

function SignUpForm(props: FormProps) {
    const { navigation } = props;
    const { theme }: ThemeContextType = useTheme();
    const style = useMemo(() => styles(theme), [theme]);

    const onSignUp = () => {
		setTimeout(() => {
			navigation.replace('TabRoutes');
		}, 2000);
	};

    return (
        <View style={style.container}>
            <Text>Preencha com seus dados completos:</Text>
            <TextInputGroup label="Nome completo" onChangeText={() => ""} />
            <TextInputGroup label="Email" onChangeText={() => ""} />
            <TextInputGroup label="Senha" input={{ secureTextEntry: true }} onChangeText={() => ""} />
            <ButtonWithLoading label="Cadastrar" onPress={onSignUp} />
            <Text>
                Já possui uma conta? <Link to={"/SignIn"} style={style.link}>Entre agora mesmo.</Link>
            </Text>
        </View>
    )
}

export default SignUpForm;