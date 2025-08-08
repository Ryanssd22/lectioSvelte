export const themes = Object.entries(import.meta.glob('./*.json', { eager: true, query: '?json' }))
  .map(([path, module]) => {
    const theme = module.default ?? module;
    return {
    ...theme,
    title: path.split('/').pop().replace('.json', '') // or whatever logic you want
    };
  });

export function applyTheme(theme) {
    for (const [key, value] of Object.entries(theme)) {
	if (key !== 'title') {
	    document.documentElement.style.setProperty(`--${key}`, value);
	}
    }
}

const lectioTheme = themes.find(theme => theme.name === 'lectio');

// export const currentTheme = $state(lectioTheme ?? themes[0] ?? {});
export const currentTheme = $state({theme: lectioTheme ?? themes[0] ?? {}})
console.log("Themes ",themes)
console.log("currentTheme",currentTheme)
