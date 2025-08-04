// import { writable } from 'svelte/themes';
import roseTheme from './rose.json'
import greenTheme from './green.json'
import beachTheme from './beach.json'
import purpleTheme from './purple.json'
import whiteTheme from './white.json'
import redTheme from './red.json'
import lectioTheme from './lectio.json'

export const themes = [
  roseTheme,
  greenTheme,
  beachTheme,
  purpleTheme,
  whiteTheme,
  redTheme,
  lectioTheme
];

export const currentTheme = $state({ theme: null });
