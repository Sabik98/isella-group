/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        isella: {
          blue: '#233e58',
          'blue-light': '#2d5070',
          'blue-dark': '#1a2f43',
          orange: '#d98732',
          'orange-light': '#e49a4d',
          'orange-dark': '#c47625',
          gray: '#f5f5f5',
          'gray-dark': '#e5e5e5',
          dark: '#1a1a1a',
          white: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        },
      },
    },
  },
  plugins: [],
};
