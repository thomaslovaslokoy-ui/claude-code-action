/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#04040A',
        'card-bg': '#0F0F1A',
        'accent-primary': '#F5C842',
        'accent-secondary': '#2DD4BF',
        'accent-danger': '#FF4D2B',
        'text-primary': '#F0F0FA',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
