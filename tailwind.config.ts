import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				'century-gothic': ['Century Gothic', 'sans-serif'],
				manrope: ['Manrope', 'sans-serif'],
			},
		},
	},
	plugins: [],
}
export default config
