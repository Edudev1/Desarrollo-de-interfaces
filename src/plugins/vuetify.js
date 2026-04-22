import 'vuetify/styles'
import { createVuetify } from 'vuetify'

const gameHausTheme = {
  dark: false,
  colors: {
    primary: '#6D3BD9',
    secondary: '#1F1A40',
    background: '#f5f5f7',
    surface: '#ffffff',
    accent: '#6D3BD9',
    info: '#6D3BD9',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    'on-primary': '#FAF9F6',
    'on-secondary': '#FAF9F6',
    'on-background': '#1F1A40',
    'on-surface': '#1F1A40',
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'gameHausTheme',
    themes: {
      gameHausTheme,
    },
  },
  icons: {
    defaultSet: 'mdi',
  },
})