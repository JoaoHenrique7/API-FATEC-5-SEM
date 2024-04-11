import { StyleSheet } from 'react-native';
import { CurrentTheme } from '../../../../contexts/ThemeContext/ThemeContext.context';

const styles = (theme: CurrentTheme) =>
	StyleSheet.create({
        footer: {
            width: '100%',
            height: 134,
        },
        footerImage: {}
	});

export default styles;
