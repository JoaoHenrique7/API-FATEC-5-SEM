import React, { useEffect, useState } from 'react';
import { Animated } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

function LoadingIcon() {
	const [rotation, _] = useState(new Animated.Value(0));

	const spin = rotation.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '360deg'],
	});

	useEffect(() => {
		Animated.loop(
			Animated.timing(rotation, {
				toValue: 1,
				duration: 1000,
				useNativeDriver: true,
			}),
		).start();
	}, [rotation]);

	return (
		<Animated.Text style={{ transform: [{ rotate: spin }] }}>
			<MaterialCommunityIcons name="loading" size={20} color="white" />
		</Animated.Text>
	);
}

export default LoadingIcon;
