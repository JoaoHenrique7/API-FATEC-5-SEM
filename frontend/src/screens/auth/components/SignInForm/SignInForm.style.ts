import { StyleSheet } from 'react-native';
import { CurrentTheme } from '../../../../contexts/ThemeContext/ThemeContext.context';

const styles = (theme: CurrentTheme) =>
	StyleSheet.create({
		container: {
			flexDirection: 'column',
			justifyContent: 'center',
			gap: theme.spacing.md,
			padding: theme.spacing.md,
		},
		forgotPassword: {
			textAlign: 'right',
			textDecorationLine: 'underline',
			color: theme.palette.neutral[1000],
		},
		link: {
			textDecorationStyle: 'solid',
			textDecorationLine: 'underline'
		}
	});

export default styles;