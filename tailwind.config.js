/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  darkmode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
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
    },
  },
  plugins: [],
};
