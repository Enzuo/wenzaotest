
// Import Markdown files as HTML into your React Application
// <https://github.com/peerigon/markdown-loader>

const { addBeforeLoader, loaderByName } = require('@craco/craco');
const rawLoader = require('craco-raw-loader')
const BabelRcPlugin = require('@jackwilsdon/craco-use-babelrc');



// Additional configuration for Typescript users: add `declare module '*.md'` to your `index.d.ts` file.

module.exports = {
  // webpack: {
  //   configure: (webpackConfig) => {
  //     webpackConfig.resolve.extensions.push('.md');

  //     const markdownLoader = {
  //       test: /\.md$/,
  //       exclude: /node_modules/,
  //       use: [
  //         // {
  //         //   loader: require.resolve('html-loader'),
  //         // },
  //         {
  //           loader: require.resolve('marked'),
  //           options: {
  //             // see <https://marked.js.org/using_advanced#options>
  //           },
  //         },
  //       ],
  //     };

  //     addBeforeLoader(webpackConfig, loaderByName('file-loader'), markdownLoader);

  //     return webpackConfig;
  //   },
  // },

  // webpack: {
  //   plugins: [
  //     { plugin: rawLoader,
  //       options: { test: /\.md$/ }
  //     }
  //   ]
  // }

  // plugins: [
  //   { plugin: BabelRcPlugin },
  // ],

  babel: {
    loaderOptions: {
      babelrc: true,
    },
  },

  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.extensions.push('.md');

      const rawLoader = {
        test: /\.md$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('raw-loader'),
            options: {

            },
          },
        ],
      };

      addBeforeLoader(webpackConfig, loaderByName('file-loader'), rawLoader);

      return webpackConfig;
    },
  },
};
