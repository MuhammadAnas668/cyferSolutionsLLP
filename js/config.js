// Tailwind config - load after tailwindcss CDN
tailwind.config = {
    darkMode: 'class',
    theme: {
      extend: {
        animation: {
          'blob': 'blob 7s infinite',
          'float': 'float 6s ease-in-out infinite',
          'shine': 'shine 4s linear infinite',
        },
        keyframes: {
          blob: {
            '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
            '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
            '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          },
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-20px)' },
          },
          shine: { 'to': { backgroundPosition: '200% center' } }
        }
      },
    },
  };
