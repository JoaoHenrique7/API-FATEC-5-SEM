import { StyleSheet } from 'react-native';
import { CurrentTheme } from '../../../contexts/ThemeContext/ThemeContext.context';

const styles = (theme: CurrentTheme) =>
	StyleSheet.create({
		logoContainer: {
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			height: 150,
			marginTop: theme.spacing.lg
		},
		logoContainerImage: {
			opacity: 0.08,
			resizeMode: 'cover',
		},
		logo: {
			width: 200,
			height: 50,
			resizeMode: 'contain',
		},
		subtitle: {
			color: theme.palette.neutral[1000],
			fontSize: 24
		}
	});

export default styles;
