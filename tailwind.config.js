/** @type {import('tailwindcss').Config} */
export default {

  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans'],
      },
      fontSize: {
        '28': '28px',
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

