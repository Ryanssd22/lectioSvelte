export const themes = Object.entries(import.meta.glob('./*.json', { eager: true, query: '?json' }))
  .map(([path, module]) => {
    const theme = module.default ?? module;
    return {
    ...theme,
    title: path.split('/').pop().replace('.json', '') // or whatever logic you want
    };
  });

const lectioTheme = themes.find(theme => theme.name === 'lectio');

// export const currentTheme = $state(lectioTheme ?? themes[0] ?? {});
export const currentTheme = $state({theme: lectioTheme ?? themes[0] ?? {}})
console.log("Themes ",themes)
console.log("currentTheme",currentTheme)
