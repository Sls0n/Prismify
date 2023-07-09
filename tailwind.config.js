/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: '#FBFBFA',
        dark: '#0e1013',
      },
      textColor: {
        primary: '#212329',
        dark: '#C2C3C9',
        purple: '#898AEB',
      },
    },
  },
  plugins: [],
}
