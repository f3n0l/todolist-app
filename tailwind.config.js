/** @type {import('tailwindcss').Config} */
export default {

  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        'darkBlue': '#005FBC',
        primary: '#0080FF',
        primaryHover: '#41A0FF',
        secondary: '#CCC',

      },
      fontFamily: {
        roboto: ['Roboto', 'sans'],
      },
      fontSize: {
        '28': '28px',
        'md': '15px',
        'sm': '10px'
      },
      lineHeight: {
        '32.81': '32.81px',
      },
      textColor: {
        primaryText: '#121212',
        secondaryText: '#BBBBBB',
      },
      backgroundColor: {
        primaryButton: '#0080FF',
        primaryButtonHover: '#41A0FF'
      }
    },
  },
  plugins: [],
}

