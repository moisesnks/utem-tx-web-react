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
        },
        secondary: {
          DEFAULT: '#2B3139',
          hover: '#202226',
          dark: '#1A1D21',
        },
        danger: {
          DEFAULT: '#e3342f',
          hover: '#CC312B',
          dark: '#D64540',
        },
        disabled: '#BDBDBD',

      },
      colors: {
        primary: '#ffed4a',
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
