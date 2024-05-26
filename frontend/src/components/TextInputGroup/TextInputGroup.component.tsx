import React, { useState, useMemo } from 'react';
import { Pressable, Text, TextInput, TextInputProps, View } from 'react-native';
import styles from './TextInputGroup.style';
import useTheme from '../../contexts/ThemeContext/useTheme.hook';
import { ThemeContextType } from '../../contexts/ThemeContext/ThemeContext.context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type TextInputGroupProperties = {
	onChangeText: (value: string) => void;
	input?: Omit<TextInputProps, 'style' | 'onChangeText'>;
	error?: string;
	label: string;
	icon?: string;
	secureTextEntry?: boolean;
	forwardRef?: React.LegacyRef<TextInput>
};

function TextInputGroup({ input, label, error, onChangeText, forwardRef, secureTextEntry }: TextInputGroupProperties) {
	const { theme }: ThemeContextType = useTheme();
	const style = useMemo(() => styles(theme), [theme]);
	const [isSecure, setIsSecure] = useState(secureTextEntry);

	const toggleSecureEntry = () => {
		setIsSecure(!isSecure);
	};

	return (
		<View style={style.container}>
			<Text style={style.label}>{label}</Text>
			<View style={style.inputContainer}>
				<TextInput
					ref={forwardRef}
					style={style.input}
					onChangeText={(text: string) => onChangeText(text)}
					secureTextEntry={isSecure}
					{...input}
				/>
			</View>
			{secureTextEntry && (
				<Pressable onPress={toggleSecureEntry} style={style.iconContainer}>
					<MaterialCommunityIcons
						name={isSecure ? "eye-off" : "eye"}
						size={24}
						color={style.icon.color}
					/>
				</Pressable>
			)}
			<Text style={error ? style.error : { ...style.error, ...style.errorActive }}>{error}</Text>
		</View>
	);
}

export default TextInputGroup;
