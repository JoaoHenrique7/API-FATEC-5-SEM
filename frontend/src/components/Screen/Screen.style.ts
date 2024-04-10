import { StyleSheet } from 'react-native';
import { CurrentTheme } from '../../contexts/ThemeContext/ThemeContext.context';

const styles = (theme: CurrentTheme) =>
	StyleSheet.create({
		container: {
			height: '100%',
		},
		scrollView: {},
		keyboardAvoidingView: {
			height: '100%',
		}
	});

export default styles;
