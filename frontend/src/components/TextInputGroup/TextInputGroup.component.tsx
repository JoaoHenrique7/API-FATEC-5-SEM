import React, { useRef, useState } from 'react';
import { GestureResponderEvent, Pressable, Text, TextInput, TextInputProps, View } from 'react-native';
import styles from './TextInputGroup.style';
import { useMemo } from 'react';
import useTheme from '../../contexts/ThemeContext/useTheme.hook';
import { ThemeContextType } from '../../contexts/ThemeContext/ThemeContext.context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type TextInputGroupProperties = {
	onChangeText: (value: string) => void;
	input?: Omit<TextInputProps, 'style' | 'onChangeText'>;
	error?: string;
	label: string;
	icon?: string;
	forwardRef?: React.LegacyRef<TextInput>
};

function TextInputGroup({ input, label, error, onChangeText, forwardRef }: TextInputGroupProperties) {
	const { theme }: ThemeContextType = useTheme();
	const style = useMemo(() => styles(theme), [theme]);

	return (
		<View style={style.container}>
			<Text style={style.label}>{label}</Text>
			<TextInput ref={forwardRef} style={style.input} onChangeText={(text: string) => onChangeText(text)} {...input} />
			<Text style={error ? style.error : { ...style.error, ...style.errorActive }}>{error}</Text>
		</View>
	);
}

export default TextInputGroup;
