import { Text, TextInput, View } from "react-native";
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

    const emailRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);

    async function onSignIn() {
        const response: User | { message: string } = await AuthService.login(formData.email, formData.senha);
        if ("message" in response) {
            setHasError(true);
            return;
        }

        login(response);

        emailRef.current?.clear();
        passwordRef.current?.clear();

        if (response.tipo === "0") {
            navigation.replace('AdminTabRoutes');
        } else {
            navigation.replace('UserTabRoutes');
        }
    }

    return (
        <View style={style.container}>
            <Text>Preencha com suas credenciais:</Text>
            {hasError && <Text style={style.error}>Email ou senha inválidos.</Text>}
            <TextInputGroup
                forwardRef={emailRef}
                label="Email"
                input={{ keyboardType: 'email-address', }}
                onChangeText={(value: string) => setFormData(prev => ({ ...prev, email: value }))}
            />
            <TextInputGroup
                forwardRef={passwordRef}
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
        </View>
    )
}

export default SignInForm;