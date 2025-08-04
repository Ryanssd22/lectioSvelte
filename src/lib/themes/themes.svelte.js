// import { writable } from 'svelte/themes';
import { writable } from 'svelte/store';

export const themes = Object.entries(import.meta.glob('./*.json', { eager: true, query: '?json' }))
  .map(([path, module]) => {
    const theme = module.default ?? module;
    return {
    ...theme,
    title: path.split('/').pop().replace('.json', '') // or whatever logic you want
    };
  });

/* export const themes = [
  roseTheme,
  greenTheme,
  beachTheme,
  purpleTheme,
  whiteTheme,
  redTheme,
  lectioTheme,
  customTheme,
    //add in here the new theme that is added
]; */

const lectioTheme = themes.find(theme => theme.name === 'lectio');

// Initialize currentTheme to lectioTheme or fallback to first theme or empty object
export const currentTheme = $state(lectioTheme ?? themes[0] ?? {});
