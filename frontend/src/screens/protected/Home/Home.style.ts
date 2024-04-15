import { StyleSheet } from 'react-native';
import { CurrentTheme } from '../../../contexts/ThemeContext/ThemeContext.context';

const styles = (theme: CurrentTheme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
		},
		addButton: {
			padding: 10,
		},
		keyboardAvoidingView: {
			flex: 1,
		},
	});

export default styles;