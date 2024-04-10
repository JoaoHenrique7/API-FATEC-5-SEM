import React from 'react';
import { Text, TextInput, TextInputProps, TextProps, View } from 'react-native';
import styles from './TextInputGroup.style';
import { useMemo } from 'react';
import useTheme from '../../contexts/ThemeContext/useTheme.hook';
import { ThemeContextType } from '../../contexts/ThemeContext/ThemeContext.context';

type TextInputGroupProperties = {
	input?: Omit<TextInputProps, 'style'>;
	label: string;
};

function TextInputGroup({ input, label }: TextInputGroupProperties) {
	const { theme }: ThemeContextType = useTheme();
	const style = useMemo(() => styles(theme), [theme]);

	return (
		<View style={style.container}>
			<Text style={style.label}>{label}</Text>
			<TextInput style={style.input} {...input} />
		</View>
	);
}

export default TextInputGroup;
