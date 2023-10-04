import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	darkMode: ['class'],
	theme: {
		extend: {
			container: {
				center: true,
				padding: '2rem',
			},
			fontFamily: {
				nunito: 'var(--font-nunito)',
				'josefin-sans': 'var(--font-josefin-sans)',
			},
			colors: {
				'primary-light': '#66DD9F',
				'primary-dark': '#40BD7C',
				'orange-light': '#FFE8D2',
				'orange-dark': '#FF7A00',
				'yellow-light': '#FFF8BA',
				'yellow-dark': '#E1CC10',
				'purple-light': '#E9D2FF',
				'purple-dark': '#9932FC',
				'blue-light': '#CAE5FF',
				'blue-dark': '#369DFD',
				'dark-1': '#191e29',
				'dark-2': '#0d1017',
				'light-1': '#FFFFFF',
				'light-2': '#F3F6F9',
				'gray-1': '#858B8F',
				'gray-2': '#c7cdd6',
			},
			boxShadow: {
				card: '0px 10px 27px 0px rgba(0, 0, 0, 0.10)',
				image: '0px 0px 20px 0px rgba(0, 0, 0, 0.10)',
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
};
export default config;
