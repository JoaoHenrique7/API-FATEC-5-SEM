import { StyleSheet } from 'react-native';
import { CurrentTheme } from '../../../../contexts/ThemeContext/ThemeContext.context';

const styles = (theme: CurrentTheme) =>
	StyleSheet.create({
        footer: {
            height: 75,
            resizeMode: 'repeat',
        },
        footerImage: {}
	});

export default styles;
