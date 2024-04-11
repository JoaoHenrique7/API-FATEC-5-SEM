import { StyleSheet } from 'react-native';
import { CurrentTheme } from '../../contexts/ThemeContext/ThemeContext.context';

const styles = (theme: CurrentTheme) =>
	StyleSheet.create({
		container: {
			flex: 1,
		},
		keyboardAvoidingView: {
			flex: 1,
		},
		scrollView: {
			height: '100%',
		},
	});

export default styles;
