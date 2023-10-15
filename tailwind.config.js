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
        black: '#121212',
        darkGray: "#AAAAAA",
        gray: "#BBBBBB",
        chrome: "#EEEEEE"
      },
      fontFamily: {
        roboto: ['Roboto', 'sans'],
      },
      fontSize: {
        '28': '28px',
        'md': '15px',
        'sm': '10px',
        'menu': '13px'
      },
      lineHeight: {
        '32.81': '32.81px',
      },
      textColor: {
        primaryText: '#121212',
        primaryTextHover: '#41A0FF',
        secondaryText: '#BBBBBB',
      },
      backgroundColor: {
        primaryButton: '#0080FF',
        primaryButtonHover: '#41A0FF',
        secondaryButton: '#EEE',
      }
    },
  },
  plugins: [],
}

