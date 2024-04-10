import { StyleSheet } from 'react-native';
import { CurrentTheme } from '../../contexts/ThemeContext/ThemeContext.context';

const styles = (theme: CurrentTheme) =>
	StyleSheet.create({
		container: {
			flexDirection: 'row',
			justifyContent: 'center',
			gap: theme.spacing.sm,
			backgroundColor: theme.palette.secondary.light,
			padding: 12,
			borderRadius: 4,
			height: 44,
		},
		containerPressed: {
			flexDirection: 'row',
			justifyContent: 'center',
			gap: theme.spacing.sm,
			backgroundColor: theme.palette.secondary.dark,
			padding: 12,
			borderRadius: 4,
			height: 44,
		},
		label: {
			fontSize: 14,
			color: theme.palette.secondary.contrast,
			fontWeight: 'bold',
			textTransform: 'uppercase',
			textAlign: 'center',
		},
	});

export default styles;
