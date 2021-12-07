const withTM = require('next-transpile-modules')([
  '@mui/material',
  '@mui/system',
]); // pass the modules you would like to see transpiled
const path = require('path');
require('dotenv').config();

module.exports = withTM({
  reactStrictMode: true,

  //Cloudinary Images  https://edcartech.mo.cloudinary.net     res.cloudinary.com  https://edcartech.mo.cloudinary.net/deeskreation
  images: {
    domains: ['res.cloudinary.com'], //https://edcartech.mo.cloudinary.net/deeskreation
  },

  //using environment variable in next at the Client Side
  env: {
    FILE_UPLOAD_FOLDER: process.env.FILE_UPLOAD_FOLDER,
    FLW_PUBLIC_KEY: process.env.FLW_PUBLIC_KEY,
    EMAIL_IMG_HEADER: process.env.EMAIL_IMG_HEADER,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_FROM: process.env.EMAIL_FROM,
    EMAIL_PORT: process.env.EMAIL_PORT,
    TXG_USER: process.env.TXG_USER,
    TXG_PASS: process.env.TXG_PASS,
  },

  // txtGhanaUser: process.env.TXG_USER, //'txg-edcartech',
  // txtGhanaPass: process.env.TXG_PASS,

  // emailHeadImage: process.env.EMAIL_IMG_HEADER,
  // emailUser: process.env.EMAIL_USER,
  // emailPass: process.env.EMAIL_PASS,
  // emailHost: process.env.EMAIL_HOST,
  // emailFrom: process.env.EMAIL_FROM,
  // emailPort: process.env.EMAIL_PORT,

  // Will only be available on the server side
  serverRuntimeConfig: {
    //FILE_UPLOAD_FOLDER:process.env.FILE_UPLOAD_FOLDER,
  },
  // Will be available on both server and client
  publicRuntimeConfig: {
    //MY_API_ENDPOINT: '/myapi/version/1'
  },

  //== For pdfjs-dist=========================
  //  config.resolve.alias['pdfjs-dist'] = path.join(
  //     __dirname,
  //     './node_modules/pdfjs-dist/legacy/build/pdf',
  //   );
  // resolve: {
  //   extensions: ['.js', '.jsx', '.ts', '.tsx'],
  //   alias: {
  //     ['pdfjs-dist']: path.join(
  //       __dirname,
  //       './node_modules/pdfjs-dist/legacy/build/pdf',
  //     ),

  //     // Point to legacy build

  //     // For pdfjs-dist 2.7.570
  //     // 'pdfjs-dist': path.resolve('./node_modules/pdfjs-dist/es5/build/pdf.js'),

  //     // For pdfjs-dist 2.8.335 and later
  //     // 'pdfjs-dist': path.resolve( __dirname,
  //     //'pdfjs-dist': path.join(__dirname,'./node_modules/pdfjs-dist/legacy/build/pdf.js',),
  //   },
  // },
  //== For pdfjs-dist=========================

  /*
  async rewrites() {
    return [
      {
        source: 'http://192.168.8.116:8080/aeci_group/:path*',
        destination: 'http://192.168.8.116:3000/:path*',
      },
    ]
  },
  */

  // Webpack 5 is enabled by default
  // You can still use webpack 4 while upgrading to the latest version of Next.js by adding the "webpack5: false" flag
  // webpack5: false,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      //-------------------------------------------
      'pdfjs-dist': path.resolve(
        './node_modules/pdfjs-dist/legacy/build/pdf.js',
      ),
      'pdfjs-dist': path.join(
        __dirname,
        './node_modules/pdfjs-dist/legacy/build/pdf',
      ),
      //-------------------------------------------
    };

    return config;
  },

  //--------> Custom Tailwind CSS
  // style: {
  //   postcss: {
  //     plugins: [
  //       require('tailwindcss')('./src/tailwind.config.js'),
  //       require('autoprefixer'),
  //     ],
  //   },
  // },
  //--------> Custom Tailwind CSS
});

// webpack.config.js

/*
config.resolve.alias['pdfjs-dist'] = path.join(
      __dirname,
      './node_modules/pdfjs-dist/legacy/build/pdf',
);
*/

/*    
module.exports = {
  entry: '...',
  output: {},
  module: {},
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      // Point to legacy build

      // For pdfjs-dist 2.7.570
      // 'pdfjs-dist': path.resolve('./node_modules/pdfjs-dist/es5/build/pdf.js'),

      // For pdfjs-dist 2.8.335 and later
      'pdfjs-dist': path.resolve(
        './node_modules/pdfjs-dist/legacy/build/pdf.js',
      ),
    },
  },
};
*/
