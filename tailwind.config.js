/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#17283D',
        'light-blue-bg': '#C8D6E6'
      },
      fontSize: {
        // Base paragraph
        'base-p': ['18px', '1.5'],
        // Bold paragraph
        'bold-p': ['20px', '1.5'],
        // Headings
        'h1': ['76px', '1.1'],
        'h1-mobile': ['49px', '1.1'],
        'h2': ['76px', '1.1'],
        'h2-mobile': ['39px', '1.1'],
        'h3': ['25px', '1.3'],
        'h3-mobile': ['18px', '1.3'],
        'stat': ['137px', '1.1'],
        'stat-mobile': ['61px', '1.1'],
        'symbol': ['49px', '1.1'],
        'symbol-mobile': ['31px', '1.1']
      },
      fontFamily: {
        'sans': ['Neue Montreal', 'sans-serif']
      },
      fontWeight: {
        'book': '400',
        'medium': '500',
        'bold': '700'
      },
      rotate: {
        'y-180': '180deg',
      },
      transformOrigin: {
        'top-left-bottom-right': 'top left bottom right',
      },
      perspective: {
        '1000': '1000px',
      }
    },
  },
  plugins: [],
}
