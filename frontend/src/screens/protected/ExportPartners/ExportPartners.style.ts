import { StyleSheet } from 'react-native';
import { CurrentTheme } from '../../../contexts/ThemeContext/ThemeContext.context';

const styles = (theme: CurrentTheme) =>
	StyleSheet.create({
        trackWrapper: {
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing.sm
        },
        trackContainer: {
            marginBottom: 10,
        },
        progressBarBackground: {
            height: 20,
            backgroundColor: '#e0e0e0',
            borderRadius: 5,
            overflow: 'hidden',
        },
        progressBarFill: {
            height: '100%',
            backgroundColor: theme.palette.secondary.main,
        },
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
        chart: {
            marginVertical: 8,
            borderRadius: 16
          }

	});

export default styles;