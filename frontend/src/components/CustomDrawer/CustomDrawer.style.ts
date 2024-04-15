import { StyleSheet } from 'react-native';
import { CurrentTheme } from '../../contexts/ThemeContext/ThemeContext.context';

const styles = (theme: CurrentTheme) =>
    StyleSheet.create({
        container: {
            flex: 1,
        },
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
        itemContainer: {
            gap: -10,
            flex: 1
        },
        drawerItem: {
            margin: theme.spacing.sm,
            padding: theme.spacing.md,
            backgroundColor: theme.palette.neutral[100],
            borderRadius: 4,
        },
        activeItem: {
            backgroundColor: theme.palette.secondary.main,
        },
        logout: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            margin: theme.spacing.sm,
            padding: theme.spacing.md,
            borderRadius: 4,
        },
        logoutContent: {
            color: theme.palette.secondary.main
        }
	});

export default styles;