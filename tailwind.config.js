// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        tertiary: 'var(--color-tertiary)',
        accent: 'var(--color-accent)',
        background: 'var(--color-background)',
        text: 'var(--color-text)',
      },
    },
  },
}
