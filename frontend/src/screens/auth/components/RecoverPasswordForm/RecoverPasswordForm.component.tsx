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
    const [code, setCode] = useState("");
    const [checkCode, setCheckCode] = useState("")

    const handleEmailChange = (email: React.SetStateAction<string>) => {
        setEmail(email);
        // console.log(email)
      };

    const handleCodeChange = (codeStr:  React.SetStateAction<string>) => {
        setCode(codeStr);
        // console.log('pau ',code)
      };

    const createCode = () => {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setCheckCode(code);
    };
    const isValidEmail = () => {
        return 'pai';
    };

    const sendEmail = () => {

    };
    

    const isSameCode =  () =>{
        if (code === checkCode){
            setScreen(Screen.VerifyCode);
        }
        alert("Por favor, insira o codigo certo.");
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
                        {/* Adicione aqui a tela de verificação de código */}
                        <Text>Verificação de Código</Text>
                        <TextInputGroup label="Codigo" input={{ onChangeText: handleCodeChange}}/>
                        <ButtonWithLoading label="Enviar Código" onPress={isSameCode} />
                    </>
                );
            case Screen.NewPassword:
                return (
                    <>
                        {/* Adicione aqui a tela de verificação de código */}
                        <Text>Verificação de Código</Text>
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
