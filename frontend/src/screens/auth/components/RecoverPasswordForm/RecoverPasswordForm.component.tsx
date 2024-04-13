import React, { useState } from "react";
import { SafeAreaView, Text } from "react-native";
import ButtonWithLoading from "../../../../components/ButtonWithLoading/ButtonWithLoading.component";
import TextInputGroup from "../../../../components/TextInputGroup/TextInputGroup.component";
import { Link, ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import styles from "./RecoverPasswordForm.style";
import { useMemo } from "react";

import useTheme from "../../../../contexts/ThemeContext/useTheme.hook";
import { ThemeContextType } from "../../../../contexts/ThemeContext/ThemeContext.context";
import UserService from "../../../../service/UserService";

type FormProps = {
    navigation: StackNavigationProp<ParamListBase, string, undefined>;
}

enum Screen {
    EmailInput,
    VerifyCode,
    NewPassword
}

function RecoverPasswordForm(props: FormProps) {
    const { navigation } = props;
    const { theme }: ThemeContextType = useTheme();
    const style = useMemo(() => styles(theme), [theme]);

    const [screen, setScreen] = useState(Screen.EmailInput);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState<number>(0);
    const [checkCode, setCheckCode] = useState<number>(0)

    const handleEmailChange = (email: React.SetStateAction<string>) => {
        setEmail(email);
      };

    const handleCodeChange = (codeStr: string) => {
        setCode(parseInt(codeStr, 10)); // 10 é a base numérica, pode ser omitida para usar a base 10 por padrão
    };

    const isValidEmail = async () => {
        try {
            const resp = await UserService.findByEmail(email);
            // let status = resp.status;
            if (resp === 200){
                return 1
            }else{
                return 0 
            }

        } catch (error) {
            console.error('Erro ao enviar email:', error);
            
        } 
    };

    const sendEmail = async () => {
        let validEmail = isValidEmail()
        if (await validEmail === 1){
            try {
                const resp = await UserService.sendEmail(email);
                let message = resp.message;
                setCheckCode(message)
                setScreen(Screen.VerifyCode);
            } catch (error) {
                console.error('Erro ao enviar email:', error);
            } 
        }else{
            alert("Email não cadastrado."); 
    }
    };

    const isSameCode =  () =>{
        console.log(checkCode)
        if (code === checkCode){
            setScreen(Screen.NewPassword);
        }else{
            alert("Por favor, insira o codigo certo.");
        }
    }

    const renderScreen = () => {
        switch (screen) {
            case Screen.EmailInput:
                return (
                    <>
                        <Text>Preencha com seu Email de cadastro:</Text>
                        <TextInputGroup label="Email"  input={{ onChangeText: handleEmailChange }}/>
                        <ButtonWithLoading label="Enviar Código" onPress={sendEmail} />
                    </>
                );
            case Screen.VerifyCode:
                return (
                    <>
                        <Text>Verificação de Código</Text>
                        <TextInputGroup label="Codigo" input={{ onChangeText: handleCodeChange}}/>
                        <ButtonWithLoading label="Enviar Código" onPress={isSameCode} />
                    </>
                );
            case Screen.NewPassword:
                return (
                    <>
                        <Text>Nova senha</Text>
                        <TextInputGroup label="Codigo" input={{ onChangeText: handleCodeChange }}/>
                        {/* <ButtonWithLoading label="Enviar Código" onPress={onRecoverPassword} /> */}
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={style.container}>
            {renderScreen()}
            <Text>
                Já possui uma conta? <Link to={"/SignIn"} style={style.link}>Entre por aqui!</Link>
            </Text>
        </SafeAreaView>
    )
}

export default RecoverPasswordForm;
