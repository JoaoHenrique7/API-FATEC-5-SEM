import { StyleSheet } from 'react-native';
import { CurrentTheme } from '../../contexts/ThemeContext/ThemeContext.context';

const styles = (theme: CurrentTheme) =>
    StyleSheet.create({
        profile: {
            flexDirection: 'row',
            alignItems: 'center',
            margin: theme.spacing.sm,
            padding: theme.spacing.sm,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: theme.palette.neutral[200]
        },
        data: {
            flex: 1,
        },
        name: {
            fontWeight: 'bold',
            fontSize: 16
        },
        metadata: {
            fontSize: 12,
        },
        icon: {
            color: theme.palette.neutral[200]
        },
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