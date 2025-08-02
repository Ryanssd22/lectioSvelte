import { writable } from 'svelte/store';

export const themes = [
	{
		title: 'lectio',
		primary: '#FFC107', // soft amber
		secondary: '#FFB300', // slightly deeper amber
		tertiary: '#FF7043', // warm coral
		accent: '#FF6F00', // dark amber
		background: '#FAF9F6', // off-white
		text: '#3E2723' // deep warm brown
	},
	{
		title: 'liturgical',
		primary: '#FFC107',
		secondary: '#FFB300',
		tertiary: '#FF7043',
		accent: '#FF6F00',
		background: '#FAF9F6',
		text: '#3E2723'
	},
	{
		title: 'green',
		primary: '#388E3C', // rich green
		secondary: '#66BB6A', // soft green
		tertiary: '#4E6700', // earthy olive
		accent: '#D4AF37', // gold
		background: '#FAF9F6',
		text: '#3E2723'
	},
	{
		title: 'white',
		primary: '#E0E0E0', // light gray-white
		secondary: '#F5F5F5', // brighter white
		tertiary: '#B0BEC5', // cool silver tone
		accent: '#D4AF37', // gold
		background: '#FAF9F6',
		text: '#3E2723'
	},
	{
		title: 'purple',
		primary: '#7A4F94', // muted purple
		secondary: '#A87DB4', // soft dusty lavender
		tertiary: '#59417C', // grayed indigo
		accent: '#D4AF37', // gold
		background: '#FAF9F6',
		text: '#3E2723'
	},
	{
		title: 'red',
		primary: '#A84444', // desaturated crimson
		secondary: '#D36F6F', // dusty red
		tertiary: '#6F2F2F', // muted dark red
		accent: '#D4AF37', // gold
		background: '#FAF9F6',
		text: '#3E2723'
	},
	{
		title: 'rose',
		primary: '#E6A1B0', // soft rose
		secondary: '#D17C94', // dusty rose
		tertiary: '#AD5D74', // deeper rose
		accent: '#D4AF37', // gold
		background: '#FAF9F6',
		text: '#3E2723'
	},
	{
		title: 'beach',
		background: '	#ffeead',
		text: '#96ceb4',
		primary: '#ff6f69'
	}
];

export const currentTheme = $state({ theme: null });
