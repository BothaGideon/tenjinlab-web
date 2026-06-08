/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        cinzel: ['Cinzel', 'serif'],
      },
      colors: {
        tenjin: {
          bg:           '#080d1a',
          surface:      '#0f1629',
          blue:         '#2563eb',
          'blue-light': '#60a5fa',
        },
        ot: {
          bg:             '#0a0010',
          surface:        '#100020',
          purple:         '#9b5de5',
          'purple-light': '#c96bff',
          pink:           '#ff50b4',
        },
      },
    },
  },
  plugins: [],
};
