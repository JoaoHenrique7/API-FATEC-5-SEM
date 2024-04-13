import { Dimensions, Platform, StyleSheet } from 'react-native';
import { CurrentTheme } from '../../contexts/ThemeContext/ThemeContext.context';

const styles = (theme: CurrentTheme) =>
	StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme.spacing.md,
            paddingVertical: theme.spacing.md,
            marginHorizontal: theme.spacing.md,
            borderBottomWidth: 1,
            borderColor: theme.palette.neutral[200],
            ...Platform.select({
                ios: {
                    paddingTop: Dimensions.get('window').width*15/100
                }
            })
        },
        menu: {
            width: 32,
            height: 32,
            borderRadius: 4,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.palette.neutral[100],
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1, },
            shadowOpacity: 0.20,
            shadowRadius: 1.41,
            elevation: 2,
        },
	});

export default styles;