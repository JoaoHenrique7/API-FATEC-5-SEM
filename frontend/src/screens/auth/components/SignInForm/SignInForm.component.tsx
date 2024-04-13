import { SafeAreaView, Text, View } from "react-native";
import ButtonWithLoading from "../../../../components/ButtonWithLoading/ButtonWithLoading.component";
import TextInputGroup from "../../../../components/TextInputGroup/TextInputGroup.component";
import { Link, ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import styles from "./SignInForm.style";
import { useMemo } from "react";
import useTheme from "../../../../contexts/ThemeContext/useTheme.hook";
import { ThemeContextType } from "../../../../contexts/ThemeContext/ThemeContext.context";

type FormProps = {
    navigation: StackNavigationProp<ParamListBase, string, undefined>;
}

function SignInForm(props: FormProps) {
    const { navigation } = props;
    const { theme }: ThemeContextType = useTheme();
    const style = useMemo(() => styles(theme), [theme]);

    const onSignIn = () => {
        navigation.replace('TabRoutes');
	};

    return (
        <View style={style.container}>
            <Text>Preencha com suas credenciais:</Text>
            <TextInputGroup label="Email" />
            <TextInputGroup label="Senha" input={{ secureTextEntry: true }} />
            <Text style={style.forgotPassword} >Esqueceu a senha?</Text>
            <ButtonWithLoading label="Entrar" onPress={onSignIn} />
            <Text>
                Não possui uma conta? <Link to={"/SignUp"} style={style.link}>Cadastre-se</Link>
            </Text>
        </View>
    )
}

export default SignInForm;