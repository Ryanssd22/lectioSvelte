import { writable } from 'svelte/store';

const themes = {
  default: {
    primary: '#1e90ff',
    secondary: '#ff69b4',
    tertiary: '#32cd32',
    accent: '#ffa500',
    background: '#ffffff',
    text: '#000000'
  },
  warmAmber: {
    primary: '#FFC107',       // soft amber
    secondary: '#FFB300',     // slightly deeper amber
    tertiary: '#FF7043',      // warm coral
    accent: '#FF6F00',        // dark amber
    background: '#FAF9F6',    // off-white
    text: '#3E2723'           // deep warm brown
  }
};

function createThemeStore() {
  let initialName = 'default';
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem('themeName');
    if (stored && themes[stored]) {
      initialName = stored;
    }
  }

  const { subscribe, set, update } = writable(themes[initialName]);

  const applyTheme = (themeObj) => {
    for (const key in themeObj) {
      document.documentElement.style.setProperty(`--${key}-color`, themeObj[key]);
    }
  };

  subscribe((value) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', JSON.stringify(value));
    }

    if (typeof document !== 'undefined') {
      applyTheme(value);
    }
  });

  return {
    subscribe,
    setColor: (key, value) => update(t => ({ ...t, [key]: value })),
    reset: () => {
      localStorage.setItem('themeName', 'default');
      set(themes.default);
    },
    setTheme: (themeName) => {
      if (themes[themeName]) {
        localStorage.setItem('themeName', themeName);
        set(themes[themeName]);
      } else {
        console.warn(`Theme "${themeName}" not found.`);
      }
    },
    getAvailableThemes: () => Object.keys(themes),
  };
}

export const themeStore = createThemeStore();
