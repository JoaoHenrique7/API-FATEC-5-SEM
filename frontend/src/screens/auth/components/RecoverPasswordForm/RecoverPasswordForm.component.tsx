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
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const [screen, setScreen] = useState(Screen.EmailInput);

    const [formData, setFormData] = useState<{ email: string, newPassword: string, newPasswordConfire: string, code: string, checkCode:string}>({ email: '', newPassword: '', newPasswordConfire:'', code:'', checkCode:'' });

    const [checkCode, setCheckCode] = useState<number>(0)

    
    const onFinish = () => {
        navigation.replace('SignIn');
	};

    const createNewPassword = async () => {
        if (formData.newPassword === formData.newPasswordConfire){
            try {
                const resp = await UserService.updatePasswordByEmail(formData.email, formData.newPassword);
                alert("Senha modificada!");
                onFinish() 
            } catch (error) {
                console.error('Erro ao criar nova senha:', error);
            }
            
        }else{
            alert("Senhas diferentes."); 
        }
    }

    const isValidEmail = async () => {
        try {
            const resp = await UserService.findByEmail(formData.email);
            if (resp === 200){
                return 1
            }else{
                return 0 
            }
        } catch (error) {
            console.error('Erro conferir email:', error);
            
        } 
    };

    const sendEmail = async () => {
        let validEmail = isValidEmail()
        if (await validEmail === 1){
            try {
                const resp = await UserService.sendEmail(formData.email);
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
        if (formData.code === String(checkCode)){
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
                        <TextInputGroup label="Email" key="emailInput" onChangeText={(value: string) => setFormData(prev => ({ ...prev, email: value }))}/>
                        <ButtonWithLoading label="Enviar Código" onPress={sendEmail} />
                        <Text>
                            Já possui uma conta? <Link to={"/SignIn"} style={style.link}>Entre por aqui!</Link>
                        </Text>
                    </>
                );
            case Screen.VerifyCode:
                return (
                    <>
                        <Text>Verificação de Código</Text>
                        <TextInputGroup label="Codigo" key="codeInput" onChangeText={(value: string) => setFormData(prev => ({ ...prev, code: value }))}/>
                        <ButtonWithLoading label="Enviar Código" onPress={isSameCode} />
                    </>
                );
            case Screen.NewPassword:
                return (
                    <>
                        <TextInputGroup
                            secureTextEntry={true}                        
                            label="Nova Senha" 
                            key="newPassword"
                            onChangeText={(value: string) => setFormData(prev => ({ ...prev, newPassword: value }))}/>
                        <TextInputGroup 
                            secureTextEntry={true}  
                            label="Confirme a nova senha" 
                            key="newPasswordVerify" 
                            onChangeText={(value: string) => setFormData(prev => ({ ...prev, newPasswordConfire: value }))}/>
                        <ButtonWithLoading label="Enviar nova Senha" onPress={createNewPassword} />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={style.container}>
            {renderScreen()}

        </SafeAreaView>
    )
}

export default RecoverPasswordForm;
