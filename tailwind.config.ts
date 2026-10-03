module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#edf6ff',
          100: '#d7ebff',
          200: '#b9dcff',
          300: '#89c5ff',
          400: '#4ea2ff',
          500: '#1d7df2',
          600: '#0f5dc7',
          700: '#0f4ca0',
          800: '#123d7d',
          900: '#143463'
        },
        navy: '#071b3d'
      },
      boxShadow: {
        soft: '0 18px 45px rgba(10, 28, 66, 0.12)'
      }
    }
  },
  plugins: []
};
