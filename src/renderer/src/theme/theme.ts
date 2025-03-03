export const themes = {
  light: {
    '--primary-color': '#1677ff',
    '--text-color': 'rgba(0, 0, 0, 0.88)',
    '--bg-color': '#ffffff',
    '--theme-name': 'light'
  },
  dark: {
    '--primary-color': '#177ddc',
    '--text-color': 'rgba(255, 255, 255, 0.85)',
    '--bg-color': '#141414',
    '--theme-name': 'dark'
  },
  blue: {
    '--primary-color': '#1d39c4',
    '--text-color': '#ffffff',
    '--bg-color': '#061178',
    '--theme-name': 'blue'
  },
  green: {
    '--primary-color': '#389e0d',
    '--text-color': '#ffffff',
    '--bg-color': '#092b00',
    '--theme-name': 'green'
  }
}

export type ThemeKey = keyof typeof themes
