//const defaultTheme = require('tailwindcss/defaultTheme');
//const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class' || 'media',

  // content: {
  //   enabled: true,
  //   content: ['./src/**/*.tsx'],
  //   options: {
  //     safelist: ['dark'], //specific classes #111827
  //   },
  // },

  content: [
    './src/**/*.tsx',
    // './pages/**/*.{js,ts,jsx,tsx}',
    // './components/**/*.{js,ts,jsx,tsx}',
    // './node_modules/flowbite/**/*.js',
  ],

  theme: {
    // typography: (theme) => ({
    //   dark: {
    //     css: {
    //       color: '#fff',
    //     },
    //   },
    // }),

    extend: {
      // fontFamily: {
      //   sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      //   //trebuchet: ['"Trebuchet MS"'],
      //   trebuchet: ['Roboto'],
      // },
      // outlineWidth: {
      //   5: '5px',
      // },
      // colors: {
      //   'warm-gray': colors.warmGray,
      //   teal: colors.teal,
      // },
    },

    // colors: {
    //   transparent: 'transparent',
    //   black: 'transparent', //'#000',#111827
    // },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/forms'),
    require('flowbite/plugin'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};

/*
{
  // Won't work:
  'sans': ['Exo 2', ...],

  // Add quotes:
  'sans': ['"Exo 2"', ...],

  // ...or escape the space:
  'sans': ['Exo\\ 2', ...],
}
*/
