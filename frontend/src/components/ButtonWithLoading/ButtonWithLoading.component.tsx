import React, { useState } from 'react';
import { GestureResponderEvent, PressableProps, PressableStateCallbackType, StyleProp, Text, ViewStyle, } from 'react-native';
import { Pressable } from 'react-native';
import styles from './ButtonWithLoading.style';
import { useMemo } from 'react';
import LoadingIcon from '../AnimatedComponents/LoadingIcon/LoadingIcon.component';
import useTheme from '../../contexts/ThemeContext/useTheme.hook';
import { ThemeContextType } from '../../contexts/ThemeContext/ThemeContext.context';

type ButtonWithLoadingProperties = {
	label?: string;
	pressable?: PressableProps;
	type?: 'primary' | 'secondary';
	onPress: (e: GestureResponderEvent) => void;
};

function ButtonWithLoading({ label = 'Click here!', type = 'primary', pressable, onPress, }: ButtonWithLoadingProperties) {
	const { theme }: ThemeContextType = useTheme();
	const style = useMemo(() => styles(theme), [theme]);

	const [isLoading, setLoading] = useState(false);

	const onPressWrapper = (e: GestureResponderEvent) => {
		setLoading(true);

		setTimeout(() => {
			onPress(e);
			setLoading(false);
		}, 1000);
	};

	const getStyle = () => {
		switch (type) {
			case 'primary':
				return theme.palette.primary.main;		
			case 'secondary':
				return theme.palette.secondary.main;
			default:
				return theme.palette.neutral[500];
		}
	}

	const pressHandler = ({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> => {
		if (pressed && !isLoading) {
			return {
				...style.containerPressed,
				backgroundColor: getStyle()
			};
		}

		if (pressable?.disabled) {
			return {
				...style.containerDisabled,
				backgroundColor: theme.palette.neutral[300]
			}
		}

		return {
			...style.container,
			backgroundColor: getStyle()
		};
	};

	return (
		<Pressable role='button' style={pressHandler} onPress={onPressWrapper} {...pressable}>
			{isLoading && <LoadingIcon />}
			{!isLoading && <Text style={style.label}>{label}</Text>}
		</Pressable>
	);
}

export default ButtonWithLoading;
