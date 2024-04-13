import { ParamListBase } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useMemo } from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';
import { ThemeContextType } from '../../../contexts/ThemeContext/ThemeContext.context';
import useTheme from '../../../contexts/ThemeContext/useTheme.hook';
import { URI_IMAGES } from '../../../assets/uri-images.asset';
import Screen from '../../../components/Screen/Screen.component';
import styles from './SignUp.style';
import SignUpForm from '../components/SignUpForm/SignUpForm.component';
import AuthFooter from '../components/AuthFooter/AuthFooter.component';

function SignUpScreen({ navigation }: StackScreenProps<ParamListBase>): React.JSX.Element {
	const { theme }: ThemeContextType = useTheme();
	const style = useMemo(() => styles(theme), [theme]);

	return (
		<Screen includePadding={false}>
			<View style={style.logoContainer}>
				<Image style={style.logo} source={{ uri: URI_IMAGES.patterns.light.oracleLogo }} />
				<Text style={style.subtitle}>CADASTRO</Text>
            </View>
			<SignUpForm navigation={navigation} />
			<AuthFooter />
		</Screen>
	);
}

export default SignUpScreen;
