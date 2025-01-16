import type { Config } from 'tailwindcss';

export default {
	darkMode: 'selector',
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				background: 'rgba(var(--background))',
				primary: 'rgba(var(--primary))',
				secondary: 'rgba(var(--secondary))',
				sky100: 'rgba(var(--sky100))',
				sky200: 'rgba(var(--sky200))',
				sky300: 'rgba(var(--sky300))',
			},
		},
	},
	plugins: [],
} satisfies Config;
