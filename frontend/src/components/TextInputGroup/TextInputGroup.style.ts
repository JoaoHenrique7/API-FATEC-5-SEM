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
		inputContainer: {
			flexDirection: 'row',
			alignItems: 'center',
		},
		input: {
			backgroundColor: theme.palette.neutral[200],
			borderWidth: 1,
			borderColor: theme.palette.neutral[300],
			color: theme.palette.neutral[1000],
			borderRadius: 4,
			padding: theme.spacing.sm,
			height: 44,
			flex: 1,
		},
		iconContainer: {
			marginTop: theme.spacing.xs,
			justifyContent: 'center',
			alignItems: 'flex-start', // Alinha o ícone à esquerda
			paddingLeft: theme.spacing.sm, // Adiciona algum espaço à esquerda
		},
		icon: {
			color: theme.palette.neutral[400],
		},
		error: {
			color: 'red',
			fontSize: 8,
			fontWeight: 'bold',
			backfaceVisibility: 'hidden'
		},
		errorActive: {
			backfaceVisibility: 'visible'
		}
	});

export default styles;
