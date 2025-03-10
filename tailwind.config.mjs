/** @type {import('tailwindcss').Config} */

export default {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		"./node_modules/flowbite/**/*.js"
	],
	theme: {
		
		extend: {
			height: {
				'128': '32rem',
			},
			typography: (theme) => ({
				DEFAULT: {
				  css: {
					fontFamily: `'Outfit', ${theme('fontFamily.sans').join(', ')}`,
					color:  '#16345F',
				  },
				}
			}),
			colors: {
				primary: '#16345F',
				secondary: '#00AA81',
				terciary: '#9BB8E0',
			  },
			fontFamily: {
				sans: ['Outfit', 'sans-serif'],
			  },
		},
	},
	plugins: [
		require('flowbite/plugin'),
		require('@tailwindcss/typography'),
	],
}
