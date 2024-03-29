/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  darkmode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        grn: "url('https://www.statpickai.com/green-gradient.jpg')",
        gld: "url('https://www.statpickai.com/gold-gradient.jpg')",
      },
      fontFamily: {
        inter: ['inter', 'sans-serif'],
        inter_bold: ['inter_bold', 'sans-serf'],
        saira: ['saira', 'sans-serif'],
        saira_bold: ['saira_bold', 'sans-serif'],
      },
      height: {
        '10p': '10%',
        '5p': '5%',
      },
      keyframes: {
        slideOutLeft: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        slideInRight: {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
      },
      animation: {
        'slide-out-left': 'slideOutLeft 0.5s forwards',
        'slide-in-right': 'slideInRight 0.5s forwards',
      },
    },
  },
  safelist: [
    'bg-[#002b5c]',
    'bg-[#00788c]',
    'bg-[#fdb927]',
    'bg-[#007dc5]',
    'bg-[#f58426]',
    'bg-[#ed174c]',
    'bg-[#008348]',
    'bg-[#ce1141]',
    'bg-[#ffb81c]',
    'bg-[#fdbb30]',
    'bg-[#00471b]',
    'bg-[#236192]',
    'bg-[#ef3b24]',
    'bg-[#000000]',
    'bg-[#ffc627]',
    'bg-[#12173f]',
    'bg-[#c4ced3]',
    'bg-[#e13a3e]',
    'bg-[#0053bc]',
    'bg-[#e56020]',
    'bg-[#5b2b82]',
    'bg-[#1d428a]',
    'hover:bg-[#002b5c]',
    'hover:bg-[#00788c]',
    'hover:bg-[#fdb927]',
    'hover:bg-[#007dc5]',
    'hover:bg-[#f58426]',
    'hover:bg-[#ed174c]',
    'hover:bg-[#008348]',
    'hover:bg-[#ce1141]',
    'hover:bg-[#ffb81c]',
    'hover:bg-[#fdbb30]',
    'hover:bg-[#00471b]',
    'hover:bg-[#236192]',
    'hover:bg-[#ef3b24]',
    'hover:bg-[#000000]',
    'hover:bg-[#ffc627]',
    'hover:bg-[#12173f]',
    'hover:bg-[#c4ced3]',
    'hover:bg-[#e13a3e]',
    'hover:bg-[#0053bc]',
    'hover:bg-[#e56020]',
    'hover:bg-[#5b2b82]',
    'hover:bg-[#1d428a]',
  ],
  plugins: [],
};
