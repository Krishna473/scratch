/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sfa: {
          header: '#f8f9fa',
          primary: '#205493',
          accent: '#0071bc',
          highlight: '#02bfe7',
          dark: '#112e51',
          surface: '#ffffff',
          bg: '#f1f3f5',
          border: '#d1d5db',
          inputBorder: '#9ca3af',
          textMuted: '#6b7280',
          torrent: '#1a365d'
        }
      },
      fontFamily: {
        sans: ['Segoe UI', 'Roboto', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
