import { ParamListBase } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, ImageBackground, Text, View } from 'react-native';
import { ThemeContextType } from '../../../contexts/ThemeContext/ThemeContext.context';
import useTheme from '../../../contexts/ThemeContext/useTheme.hook';
import styles from './SignIn.style';
import { URI_IMAGES } from '../../../assets/uri-images.asset';
import SignInForm from '../components/SignInForm/SignInForm.component';
import Screen from '../../../components/Screen/Screen.component';
import AuthFooter from '../components/AuthFooter/AuthFooter.component';

function SignInScreen({ navigation }: StackScreenProps<ParamListBase>): React.JSX.Element {
	const { theme }: ThemeContextType = useTheme();
	const style = useMemo(() => styles(theme), [theme]);

	return (
		<Screen>
			<View style={style.logoContainer}>
				<Image style={style.logo} source={{ uri: URI_IMAGES.patterns.light.oracleLogo }} />
				<Text style={style.subtitle}>LOGIN</Text>
			</View>
			<SignInForm navigation={navigation} />
			<AuthFooter />
		</Screen>
	);
}

export default SignInScreen;
