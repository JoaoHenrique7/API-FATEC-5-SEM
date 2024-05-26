import { StyleSheet } from 'react-native';
import { CurrentTheme } from '../../../contexts/ThemeContext/ThemeContext.context';

const styles = (theme: CurrentTheme) =>
	StyleSheet.create({
        header: {
            gap: theme.spacing.md
        },
        goBack: {
            flexDirection: 'row',
            gap: theme.spacing.sm
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
            gap: theme.spacing.md,
            marginTop: theme.spacing.md
        },
        tracktitle: {
            fontWeight: 'bold',
            fontSize: 18
        },
        trackAccordion: {},
        expertiseAccordion: {},
        expertiseAccordionContent: {}
	});

export default styles;