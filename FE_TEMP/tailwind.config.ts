module.exports = {
  // ... konfigurasi lain
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        confettiFall: {
          to: { transform: 'translateY(110vh) rotate(720deg)', opacity: '0' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
        '[confettiFall_linear_forwards]': 'confettiFall linear forwards',
      },
    },
  },
};
