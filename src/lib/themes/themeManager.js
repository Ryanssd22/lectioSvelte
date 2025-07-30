export function themes(newTheme) {
	document.documentElement.classList.remove(`theme-${localStorage.getItem('theme')}`);
	document.documentElement.classList.add(`theme-${newTheme}`);
	theme.set(newTheme);
}
