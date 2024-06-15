// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        dark: '#242424',
        primary: {
          DEFAULT: '#ffed4a',
          hover: '#FCD535',
          dark: '#F9C74F',
          light: '#f97316',
          lighthover: '#ff9d5a',

        },
        secondary: {
          DEFAULT: '#2B3139',
          hover: '#202226',
          dark: '#1A1D21',
          light: '#2ecc71',
          lighthover: '#27ae60',
        },
        danger: {
          DEFAULT: '#e3342f',
          hover: '#CC312B',
          dark: '#D64540',
        },
        light: {
          DEFAULT: '#F5F5F5',
          dark: '#E5E5E5',
          secondary: '#F0F0F0',
        },
        disabled: '#BDBDBD',
      },
      colors: {
        primary: {
          DEFAULT: '#ffed4a',
          hover: '#FCD535',
          dark: '#F9C74F',
          light: '#f97316',
        },
        secondary: '#2B3139',
        danger: '#e3342f',
      },
      listStyleType: {
        square: 'square',
        roman: 'upper-roman',
        alpha: 'lower-alpha',
      },
    },
  },
  plugins: [],
};
