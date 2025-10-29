module.exports = {
  content: [
    './dist/**/*.html',
    './dist/**/*.js',
    './src/js/**/*.js'
  ],
  theme: {
    container: {
      center: true,
      padding: '16px',
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1320px',
    }
  },
  plugins: [],
}