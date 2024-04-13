import { StyleSheet } from 'react-native';
import { CurrentTheme } from '../../contexts/ThemeContext/ThemeContext.context';

const styles = (theme: CurrentTheme) =>
    StyleSheet.create({
        drawerItem: {
            margin: theme.spacing.sm,
            padding: theme.spacing.md,
            backgroundColor: theme.palette.neutral[100],
            borderRadius: 4,
        },
        activeItem: {
            backgroundColor: theme.palette.secondary.light + '55',
        }
	});

export default styles;