import { theme } from './stores/themeStore';

export function setTheme(newTheme) {
	document.documentElement.classList.remove(`theme-${localStorage.getItem('theme')}`);
	document.documentElement.classList.add(`theme-${newTheme}`);
	theme.set(newTheme);
}
