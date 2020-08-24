// const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const Visualizer = require('webpack-visualizer-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const CompressionPlugin = require('compression-webpack-plugin');

// let ExtractTextPlugin = require("extract-text-webpack-plugin");

const DIST_DIR = path.resolve(__dirname, 'dist');
// const AUTOPREFIXER_LOADER = 'autoprefixer-loader?{browsers:['
//     + '"Android 2.3", "Android >= 4", "Chrome >= 20", "Firefox >= 24", '
//     + '"Explorer >= 8", "iOS >= 6", "Opera >= 12", "Safari >= 6"]}';
//
// const reactExternal = {
//   root: 'React',
//   commonjs2: 'react',
//   commonjs: 'react',
//   amd: 'react'
// };
// const reactDOMExternal = {
//   root: 'ReactDOM',
//   commonjs2: 'react-dom',
//   commonjs: 'react-dom',
//   amd: 'react-dom'
// };
// const momentExternal = {
//   root: 'moment',
//   commonjs2: 'moment',
//   commonjs: 'moment',
//   amd: 'moment'
// };
// const polyfillExternal = {
//   root: 'babel-polyfill',
//   commonjs2: 'babel-polyfill',
//   commonjs: 'babel-polyfill',
//   amd: 'babel-polyfill'
// };

// const externalmw = {
//   // react: reactExternal,
//   // 'react-dom': reactDOMExternal,
//   // 'babel-polyfill': polyfillExternal
//
//   // react: reactExternal,
//   // 'react-dom': reactDOMExternal
//   //
//   // // , 'babel-polyfill': polyfillExternal
//
// };

// const settings = JSON.parse(fs.readFileSync('./src/settings.json', 'utf8'));

const settings = './src/settings.json';

const settingsExternal = {
  root: settings,
  commonjs2: settings,
  commonjs: settings,
  amd: settings
};

const externalFile = {
  settings: settingsExternal
};

const webpackAnalyzers = [
    new Visualizer({ filename: './statistics.html' }),
];
if (process.env.WEBPACK_ANALYZER === 'multi') {
    webpackAnalyzers.push(new BundleAnalyzerPlugin({ analyzerMode: 'static' }));
}

module.exports = function (env) {
  return {
    entry: {
        'ebyte-manager-web.min': './src/index.tsx',
        'ebyte-manager-web': './src/index.tsx'
    },
    // externals: externalFile,
    output: {
      path: DIST_DIR,
      filename: '[name].js',
      libraryTarget: 'umd',
      library: 'EbyteManager',
      sourceMapFilename: '[file].map'
    },
    devtool: 'source-map',

    module: {

      rules: [
          {
              test: /\.css$/,
              use: [
                  { loader: 'style-loader', options: { sourceMap: true } },
                  { loader: 'css-loader', options: { sourceMap: true } },
                  { loader: 'postcss-loader', options: { sourceMap: true } },
              ]
          },
          {
              test: /\.less$/,
              use: [
                  { loader: 'style-loader', options: { sourceMap: true } },
                  { loader: 'css-loader', options: { sourceMap: true } },
                  { loader: 'postcss-loader', options: { sourceMap: true } },
                  { loader: 'less-loader', options: { sourceMap: true } }
              ]
          },
          {
              test: /\.gif/,
              loader: 'url-loader?limit=100000&mimetype=image/gif'
          },
          {
              test: /\.jpg/,
              loader: 'url-loader?limit=100000&mimetype=image/jpg'
          },
          {
              test: /\.png/,
              loader: 'url-loader?limit=100000&mimetype=image/png'
          },
          {
              test: /\.svg/,
              loader: 'url-loader?limit=100000&mimetype=image/svg+xml'
          }, {
              test: /\.json$/,
              type: 'javascript/auto',
              loader: 'json-loader'
          },
          {
              test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
              loader: 'url-loader?limit=100000&mimetype=application/font-woff'
          }, {
              test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
              loader: 'url-loader?limit=100000&mimetype=application/font-woff'
          }, {
              test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
              loader: 'url-loader?limit=100000&mimetype=application/octet-stream'
          }, {
              test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
              loader: 'file-loader'
          },
          {
              test: /\.txt$/,
              loader: 'raw-loader'
          },
          {
              test: /\.CSV$/,
              loader: 'raw-loader'
          },
          {
              test: /\.ts(x?)$/,
              exclude: /node_modules/,
              use: [
                  {
                      loader: "ts-loader"
                  }
              ]
          },
          // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
          {
              enforce: "pre",
              test: /\.js$/,
              loader: "source-map-loader"
          }
      ]
    },

        plugins: [
            new webpack.DefinePlugin({
                "process.env": {
                    NODE_ENV: JSON.stringify((env.PACKAGE_FORMAT === 'debug') ? 'development' : 'production')
                }
            }),
            // new webpack.NormalModuleReplacementPlugin(
            //     /iconset\/MWDefaultIcons/, iconSet[APP_TYPE]
            // ),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.AggressiveMergingPlugin(),
            // new Dotenv({
            //     path: './library.env',
            //     safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
            //     systemvars: false, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
            //     silent: false // hide any errors
            // }),
            ...webpackAnalyzers,
        ],
        optimization: {
            // splitChunks: {
            //     chunks: 'all',
            //     minChunks: 3
            // },

            nodeEnv: 'library',
            // splitChunks: {
            //     chunks: 'async',
            //     minSize: 200000,
            //     maxSize: 600000,
            //     minChunks: 1,
            //     maxAsyncRequests: 5,
            //     maxInitialRequests: 3,
            //     automaticNameDelimiter: '~',
            //     name: true,
            //     cacheGroups: {
            //         vendors: {
            //             test: /[\\/]node_modules[\\/]/,
            //             priority: -10
            //         },
            //         default: {
            //             minChunks: 2,
            //             priority: -20,
            //             reuseExistingChunk: true
            //         }
            //     }
            // },
            // minimizer: (env.PACKAGE_FORMAT !== 'debug') ? [
            //     // new CleanWebpackPlugin( cleanOptions),
            //     // we specify a custom UglifyJsPlugin here to get source maps in production
            //     new UglifyJsPlugin({
            //         cache: true,
            //         parallel: true,
            //         uglifyOptions: {
            //             warnings: false,
            //             parse: {},
            //             compress: {},
            //             // mangle: {
            //             //     properties: {
            //             //         // mangle property options
            //             //     }
            //             // },
            //             output: {
            //                 comments: false,
            //                 beautify: false
            //             },
            //             toplevel: false,
            //             nameCache: null,
            //             ie8: false,
            //             keep_fnames: false,
            //         },
            //         sourceMap: true
            //     })
            // ] : undefined
            minimize: true,
            minimizer: [new TerserPlugin()],

        },

    resolve: {
        extensions: ['.webpack.js', '.web.js', '.js', '.jsx', ".json", ".ts", ".tsx"]
    }
  };
};
