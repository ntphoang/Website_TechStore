/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pastel: {
          peach: '#F6D3A0',
          yellow: '#FBECA5',
          ice: '#D6FAFC',
          mint: '#77CDB5',
          teal: '#3E8282',
        },
      },
    },
  },
  plugins: [],
};
