import { SafeAreaView, Text } from "react-native";
import ButtonWithLoading from "../../../../components/ButtonWithLoading/ButtonWithLoading.component";
import TextInputGroup from "../../../../components/TextInputGroup/TextInputGroup.component";
import { Link, ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import styles from "./RecoverPasswordForm.style";
import { useMemo } from "react";
import useTheme from "../../../../contexts/ThemeContext/useTheme.hook";
import { ThemeContextType } from "../../../../contexts/ThemeContext/ThemeContext.context";

type FormProps = {
    navigation: StackNavigationProp<ParamListBase, string, undefined>;
}

function RecoverPasswordForm(props: FormProps) {
    const { navigation } = props;
    const { theme }: ThemeContextType = useTheme();
    const style = useMemo(() => styles(theme), [theme]);

    const onRecoverPassword = () => {
		setTimeout(() => {
			navigation.replace('TabRoutes');
		}, 2000);
	};

    return (
        <SafeAreaView style={style.container}>
            <Text>Preencha com seu Email de cadastro:</Text>
            <TextInputGroup label="Email" />
            <ButtonWithLoading label="Sign in" onPress={onRecoverPassword} />
            <Text>
                Já possui uma conta? <Link to={"/SignIn"} style={style.link}>Entre por aqui!</Link>
            </Text>
        </SafeAreaView>
    )
}

export default RecoverPasswordForm;