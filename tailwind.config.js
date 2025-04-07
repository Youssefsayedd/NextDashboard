/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          background: '#1A1A1A',
          text: '#E0E0E0',
          accent: '#00A8FF',
        },
        secondary: {
          background: '#2D2D2D',
          text: '#A0A0A0',
        },
        accent: {
          success: '#00CC99',
          warning: '#FF5555',
        },
        border: '#404040',
      },
      backdropBlur: {
        'lg': '16px',
      },
      backgroundColor: {
        'glass': 'rgba(45, 45, 45, 0.5)',
      },
      borderColor: {
        'glass': 'rgba(64, 64, 64, 0.3)',
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};


