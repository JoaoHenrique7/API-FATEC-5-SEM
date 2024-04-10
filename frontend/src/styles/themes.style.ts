export type Theme = 'dark';

type TonePalette = {
	100: string;
	200: string;
	300: string;
	400: string;
	500: string;
	600: string;
	700: string;
	800: string;
	900: string;
	1000: string;
};

type TriadPalette = {
	light: string;
	main: string;
	dark: string;
	contrast: string;
};

type PurePalette = {
	white: '#FFFFFF';
	black: '#000000';
};

export type ColorPalette = {
	pure: PurePalette;
	neutral: TonePalette;
	primary: TriadPalette;
	secondary: TriadPalette;
};

export const themes: Record<Theme, ColorPalette> = {
	dark: {
		pure: {
			white: '#FFFFFF',
			black: '#000000',
		},
		neutral: {
			100: '#F5F5F5',
			200: '#DCDCDC',
			300: '#C3C3C3',
			400: '#ABABAB',
			500: '#979797',
			600: '#8B8B8B',
			700: '#606060',
			800: '#484848',
			900: '#2F2F2F',
			1000: '#161616',
		},
		primary: {
			light: '#615e5b',
			main: '#3A3632',
			dark: '#2e2b28',
			contrast: '#FFFFFF',
		},
		secondary: {
			light: '#d26b5d',
			main: '#C74634',
			dark: '#9f382a',
			contrast: '#ffffff',
		},
	},
} as const;
