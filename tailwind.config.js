/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/views/**/*.{html,hbs}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E50914',
          foreground: '#221F1F',
        },
        secondary: {
          DEFAULT: '#B81D24',
          foreground: '#221F1F',
        },
        mainblack: {
          DEFAULT: '#221F1F',
          foreground: '#F5F5F1',
        },
        mainwhite: {
          DEFAULT: '#F5F5F1',
          foreground: '#221F1F',
        },
        muted: {
          DEFAULT: '#E0E0E0',
          foreground: '#757575',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans'],
      },
    },
  },
  plugins: [],
};
