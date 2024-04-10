import { useContext } from 'react';
import { ThemeContext, ThemeContextType } from './ThemeContext.context';

function useTheme(): ThemeContextType {
	const context: ThemeContextType | undefined = useContext(ThemeContext);

	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}

	return context;
}

export default useTheme;
