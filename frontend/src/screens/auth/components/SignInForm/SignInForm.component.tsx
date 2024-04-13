import { Text, View } from "react-native";
import ButtonWithLoading from "../../../../components/ButtonWithLoading/ButtonWithLoading.component";
import TextInputGroup from "../../../../components/TextInputGroup/TextInputGroup.component";
import { Link, ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import styles from "./SignInForm.style";
import { useMemo, useRef, useState } from "react";
import useTheme from "../../../../contexts/ThemeContext/useTheme.hook";
import { ThemeContextType } from "../../../../contexts/ThemeContext/ThemeContext.context";
import AuthService from "../../../../service/AuthService";
import { User } from "../../../../types/definitions";
import useSession from "../../../../contexts/SessionContext/useSession.hook";

type FormProps = {
    navigation: StackNavigationProp<ParamListBase, string, undefined>;
}

function SignInForm(props: FormProps) {
    const { navigation } = props;
    const { theme }: ThemeContextType = useTheme();
    const style = useMemo(() => styles(theme), [theme]);
    const { login } = useSession();
    
    const [formData, setFormData] = useState<{ email: string, senha: string }>({ email: '', senha: '' });
    const [hasError, setHasError] = useState<boolean>(false);

    async function onSignIn() {
        const response: User | { message: string } = await AuthService.login(formData.email, formData.senha);

        if ("message" in response) {
            setHasError(true);
            return;
        }

        await login(response);
        navigation.navigate('TabRoutes');
    }

    return (
        <View style={style.container}>
            <Text>Preencha com suas credenciais:</Text>
            {hasError && <Text style={style.error}>Email ou senha inválidos.</Text>}
            <TextInputGroup
                label="Email"
                input={{ keyboardType: 'email-address' }}
                onChangeText={(value: string) => setFormData(prev => ({ ...prev, email: value }))}
            />
            <TextInputGroup
                label="Senha"
                input={{ secureTextEntry: true }}
                onChangeText={(value: string) => setFormData(prev => ({ ...prev, senha: value}))}
            />
            <Text><Link to={"/RecoverPassword"} style={style.forgotPassword}>Esqueceu a senha?</Link></Text>
            <ButtonWithLoading
                pressable={{ disabled: (!formData.email || !formData.senha) }}
                label="Sign in"
                onPress={onSignIn}
            />
            <Text>
                Não possui uma conta? <Link to={"/SignUp"} style={style.link}>Cadastre-se</Link>
            </Text>
        </View>
    )
}

export default SignInForm;