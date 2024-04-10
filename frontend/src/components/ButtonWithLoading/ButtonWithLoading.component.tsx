import React, { useEffect, useState } from 'react';
import {
	GestureResponderEvent,
	PressableProps,
	PressableStateCallbackType,
	StyleProp,
	Text,
	ViewStyle,
} from 'react-native';
import { Pressable } from 'react-native';
import styles from './ButtonWithLoading.style';
import { useMemo } from 'react';
import LoadingIcon from '../AnimatedComponents/LoadingIcon/LoadingIcon.component';
import useTheme from '../../contexts/ThemeContext/useTheme.hook';
import { ThemeContextType } from '../../contexts/ThemeContext/ThemeContext.context';

type ButtonWithLoadingProperties = {
	label?: string;
	pressable?: PressableProps;
	onPress: (e: GestureResponderEvent) => void;
};

function ButtonWithLoading({ label = 'Click here!', pressable, onPress }: ButtonWithLoadingProperties) {
	const { theme }: ThemeContextType = useTheme();
	const style = useMemo(() => styles(theme), [theme]);

	const [isLoading, setLoading] = useState(false);

	const onPressWrapper = (e: GestureResponderEvent) => {
		setLoading(true);

		onPress(e);
	};

	const pressHandler = ({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> => {
		if (pressed && !isLoading) {
			return style.containerPressed;
		}

		return style.container;
	};

	return (
		<Pressable style={pressHandler} onPress={onPressWrapper} {...pressable}>
			{isLoading && <LoadingIcon />}
			{!isLoading && <Text style={style.label}>{label}</Text>}
		</Pressable>
	);
}

export default ButtonWithLoading;
