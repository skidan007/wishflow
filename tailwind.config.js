/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      colors: {
        ink: '#101828',
        lavender: '#f8f4ff',
        coral: '#fb7185',
        balance: '#0f172a',
      },
      boxShadow: {
        card: '0 20px 60px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
};
