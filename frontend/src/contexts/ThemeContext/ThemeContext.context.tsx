import React, { Context, createContext, useState } from 'react';
import { ColorPalette, Theme, themes } from '../../styles/themes.style';
import { spacing, SpacingSizes } from '../../styles/spacing.style';

export type CurrentTheme = {
	theme: Theme;
	palette: ColorPalette;
	spacing: SpacingSizes;
};

export type ThemeContextType = {
	theme: CurrentTheme;
	toggleTheme: (theme: Theme) => void;
};

export const ThemeContext: Context<ThemeContextType | undefined> = createContext<
	ThemeContextType | undefined
>(undefined);

function ThemeContextProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
	const [theme, setTheme]: [CurrentTheme, React.Dispatch<React.SetStateAction<CurrentTheme>>] =
		useState<CurrentTheme>({
			theme: 'dark',
			palette: themes.dark,
			spacing: spacing,
		});

	const toggleTheme = (theme: Theme): void => {
		setTheme((previous) => ({ ...previous, theme, palette: themes[theme] }));
	};

	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export default ThemeContextProvider;
