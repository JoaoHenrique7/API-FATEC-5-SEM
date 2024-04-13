import { StyleSheet } from 'react-native';
import { CurrentTheme } from '../../contexts/ThemeContext/ThemeContext.context';

const styles = (theme: CurrentTheme) =>
	StyleSheet.create({
		container: {
			position: 'relative',
			gap: theme.spacing.xs,
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
			height: 44,
		},
		iconContainer: {
			position: 'absolute',
			top: 30,
			right: 18,
			zIndex: 1,
			justifyContent: 'center',
			alignItems: 'center',
		},
		icon: {
			color: theme.palette.neutral[400],
		},
		error: {
			color: 'red',
			fontSize: 12,
			fontWeight: 'bold',
			backfaceVisibility: 'hidden'
		},
		errorActive: {
			backfaceVisibility: 'visible'
		}
	});

export default styles;
