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
        },
        secondary: {
          DEFAULT: '#2B3139',
          hover: '#202226',
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
