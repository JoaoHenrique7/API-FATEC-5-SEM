import { StyleSheet } from 'react-native';
import { CurrentTheme } from '../../contexts/ThemeContext/ThemeContext.context';

const styles = (theme: CurrentTheme) =>
	StyleSheet.create({
		container: {
			gap: theme.spacing.sm,
		},
		label: {
			color: theme.palette.neutral[1000],
			textTransform: 'uppercase',
			fontSize: 12,
		},
		input: {
			backgroundColor: theme.palette.neutral[200],
			borderWidth: 1,
			borderColor: theme.palette.neutral[300],
			color: theme.palette.pure.white,
			borderRadius: 4,
			padding: theme.spacing.sm,
		},
	});

export default styles;
