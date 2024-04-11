import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import styles from './TextInputGroup.style';
import { useMemo } from 'react';
import useTheme from '../../contexts/ThemeContext/useTheme.hook';
import { ThemeContextType } from '../../contexts/ThemeContext/ThemeContext.context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type TextInputGroupProperties = {
	input?: Omit<TextInputProps, 'style'>;
	error?: string;
	label: string;
	icon?: string;
};

function TextInputGroup({ input, label, error }: TextInputGroupProperties) {
	const { theme }: ThemeContextType = useTheme();
	const style = useMemo(() => styles(theme), [theme]);

	return (
		<View style={style.container}>
			<Text style={style.label}>{label}</Text>
			<MaterialCommunityIcons style={style.icon} name="lock" size={20} color={theme.palette.neutral[300]} />
			<TextInput style={style.input} {...input} />
			<Text style={error ? style.error : {...style.error, ...style.errorActive}}>{error}</Text>
		</View>
	);
}

export default TextInputGroup;
