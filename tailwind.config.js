const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        '.bg-cyan-400-op-75': {
          backgroundColor: 'rgba(34,211,238,0.75)'
        },
        '.bg-cyan-800-op-60': {
          backgroundColor: 'rgb(21,94,117,0.60)'
        },
        '.bg-purple-200-op-30': {
          backgroundColor: 'rgba(233,213,255,0.3)'
        },
        '.bg-purple-200-op-40': {
          backgroundColor: 'rgba(233,213,255,0.4)'
        },
        '.bg-purple-200-op-60': {
          backgroundColor: 'rgba(233,213,255,0.6)'
        },
        '.bg-purple-600-op-40': {
          backgroundColor: 'rgba(147,51,234,0.4)'
        },
        '.bg-blue-800-op-20': {
          backgroundColor: 'rgba(30,64,175,0.2)'
        },
        '.bg-red-900-op-10': {
          backgroundColor: 'rgba(127,29,29,0.1)'
        },
        '.bg-yellow-700-op-20': {
          backgroundColor: 'rgba(161,98,7,0.2)'
        },
      });
    })
  ],
};
