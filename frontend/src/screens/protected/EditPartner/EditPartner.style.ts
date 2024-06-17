import { StyleSheet } from 'react-native';
import { CurrentTheme } from '../../../contexts/ThemeContext/ThemeContext.context';

const styles = (theme: CurrentTheme) =>
	StyleSheet.create({
        header: {
            gap: theme.spacing.md
        },
        goBack: {
            flexDirection: 'row',
            gap: theme.spacing.sm,
            alignItems: 'center'
        },
        title: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme.spacing.sm,
        },
        titleText: {
            fontSize: 18,
            fontWeight: 'bold'
        },
        form: {
            flex: 1
        },
        trackWrapper: {
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing.sm,
            marginTop: theme.spacing.md
        },
        tracktitle: {
            fontWeight: 'bold',
            fontSize: 18
        },
        trackBtn: {
            backgroundColor: theme.palette.neutral[200],
            padding: theme.spacing.md,
            borderRadius: 4,
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: "space-between"
        },
        checkContainer: {
            backgroundColor: "transparent",
            margin: 0,
            padding: theme.spacing.sm
        },
        checkbox: {},
        expertiseName: {
            marginTop: theme.spacing.md,
            fontWeight: "bold"
        },
        track: {
            marginTop: theme.spacing.md,
            fontWeight: 'bold',
            fontSize: 18,
            padding: theme.spacing.md,
            backgroundColor: theme.palette.secondary.light,
            borderRadius: 4
        },
        expertisesView: {
            paddingBottom: 100
        },
        saveBtn: {
            marginTop: theme.spacing.md,
            backgroundColor: theme.palette.primary.main,
            borderRadius: 4,
            alignItems: 'center',
            justifyContent: 'center',
        },
        btnText: {
            color: theme.palette.neutral[100],
            padding: theme.spacing.md,
        }
	});

export default styles;