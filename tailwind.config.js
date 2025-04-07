import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {},
		fontFamily: {
			display: ["Satoshi", "sans-serif"],
		},
	},
	darkMode: "class",
	plugins: [heroui()],

};
