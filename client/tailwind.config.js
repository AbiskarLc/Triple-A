/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'abc':["Inter"],
        'cursive': ["Montserrat", 'sans-serif']
      }
    },
  
    animation: {
      bounce: 'bounce 1.5s 5',
    },
  },
  plugins: [],
}