import { ParamListBase } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, ImageBackground, Text, View } from 'react-native';
import { ThemeContextType } from '../../../contexts/ThemeContext/ThemeContext.context';
import useTheme from '../../../contexts/ThemeContext/useTheme.hook';
import { URI_IMAGES } from '../../../assets/uri-images.asset';
import SignInForm from '../components/SignInForm/SignInForm.component';
import Screen from '../../../components/Screen/Screen.component';
import styles from './SignUp.style';
import SignUpForm from '../components/SignUpForm/SignUpForm.component';

function SignUpScreen({ navigation }: StackScreenProps<ParamListBase>): React.JSX.Element {
	const { theme }: ThemeContextType = useTheme();
	const style = useMemo(() => styles(theme), [theme]);

	return (
		<Screen>
			<ImageBackground
				style={style.logoContainer}
				imageStyle={style.logoContainerImage}
				source={{ uri: URI_IMAGES.oraclePattern }}
			>
				<Image style={style.logo} source={{ uri: URI_IMAGES.oracleLogo }} />
				<Text style={style.subtitle}>CADASTRO</Text>
            </ImageBackground>
            <SignUpForm navigation={navigation} />
		</Screen>
	);
}

export default SignUpScreen;
