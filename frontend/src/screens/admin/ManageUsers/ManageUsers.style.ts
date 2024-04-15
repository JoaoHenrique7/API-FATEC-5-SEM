import { StyleSheet } from 'react-native';
import { CurrentTheme } from '../../../contexts/ThemeContext/ThemeContext.context';

const styles = (theme: CurrentTheme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			padding: theme.spacing.md,
			gap: theme.spacing.sm
		},
		events: {
			alignItems: 'flex-end'
		},
		addButton: {
			flexDirection: 'row',
			justifyContent: 'flex-start',
			alignItems: 'center',
			gap: theme.spacing.xs,
			padding: theme.spacing.sm,
			backgroundColor: theme.palette.secondary.main,
			borderRadius: 4
		},
		addButtonContent: {},
		datalist: {
			borderRadius: 4,
			borderWidth: 1,
			borderColor: theme.palette.neutral[200]
		},
		item: {
			flexDirection: 'row',
			alignItems: 'center',
			gap: theme.spacing.md,
			padding: theme.spacing.md,
			borderBottomWidth: 1,
			borderBottomColor: theme.palette.neutral[200]
		},
		itemData: {
			flex: 1,
		},
		mainData: {
			fontWeight: 'bold',
		},
		subData: {},
		itemActions: {
			flexDirection: 'row',
			gap: theme.spacing.md
		},
		edit: {},
		delete: {}
	});

export default styles;