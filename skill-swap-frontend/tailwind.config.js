/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7c3aed', // violet-600
          light: '#a78bfa',   // violet-300
          dark: '#4c1d95',    // violet-900
        },
        white: '#ffffff',
      },
      backgroundColor: {
        primary: '#7c3aed',
        'primary-light': '#a78bfa',
        'primary-dark': '#4c1d95',
        white: '#ffffff',
      },
      textColor: {
        primary: '#7c3aed',
        white: '#ffffff',
      },
      borderColor: {
        primary: '#7c3aed',
        white: '#ffffff',
      },
    },
  },
  plugins: [],
};
