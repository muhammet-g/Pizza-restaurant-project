const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: isProduction ? 'production' : 'development',
    entry: './src/js/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      // Use contenthash for better caching in production
      filename: isProduction ? 'js/[name].[contenthash:8].js' : 'js/[name].js',
      chunkFilename: isProduction ? 'js/[name].[contenthash:8].chunk.js' : 'js/[name].chunk.js',
      assetModuleFilename: 'assets/[name].[hash:8][ext]',
      clean: true, // Clean dist folder before each build
      publicPath: '/',
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    module: {
      rules: [
        {
          test: /\.html$/i,
          loader: 'html-loader',
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              cacheDirectory: true, // Speed up babel compilation
            },
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: !isProduction,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: !isProduction,
              },
            },
          ],
        },
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: !isProduction,
              },
            },
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024, // Inline images smaller than 8kb
            },
          },
          generator: {
            filename: 'assets/images/[name].[hash:8][ext]',
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/fonts/[name].[hash:8][ext]',
          },
        },
      ],
    },
    plugins: [
      // HTML Pages
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        minify: isProduction
          ? {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          }
          : false,
      }),
      new HtmlWebpackPlugin({
        template: './src/pizza.html',
        filename: 'pizza.html',
        minify: isProduction,
      }),
      new HtmlWebpackPlugin({
        template: './src/about.html',
        filename: 'about.html',
        minify: isProduction,
      }),
      new HtmlWebpackPlugin({
        template: './src/contact.html',
        filename: 'contact.html',
        minify: isProduction,
      }),
      new HtmlWebpackPlugin({
        template: './src/cart.html',
        filename: 'cart.html',
        minify: isProduction,
      }),

      // Extract CSS with contenthash
      new MiniCssExtractPlugin({
        filename: isProduction ? 'css/[name].[contenthash:8].css' : 'css/[name].css',
        chunkFilename: isProduction ? 'css/[name].[contenthash:8].chunk.css' : 'css/[name].chunk.css',
      }),

      // Gzip compression for production
      ...(isProduction
        ? [
          new CompressionPlugin({
            filename: '[path][base].gz',
            algorithm: 'gzip',
            test: /\.(js|css|html|svg)$/,
            threshold: 10240, // Only compress files larger than 10kb
            minRatio: 0.8,
          }),
        ]
        : []),
    ],
    optimization: {
      minimize: isProduction,
      minimizer: [
        // Minify JavaScript
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
              drop_console: isProduction, // Remove console.logs in production
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
          parallel: true,
          extractComments: false,
        }),

        // Minify CSS
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: [
              'default',
              {
                discardComments: { removeAll: true },
              },
            ],
          },
        }),

        // Optimize and compress images
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
              plugins: [
                ['gifsicle', { interlaced: true }],
                ['jpegtran', { progressive: true }],
                ['optipng', { optimizationLevel: 5 }],
                [
                  'svgo',
                  {
                    plugins: [
                      {
                        name: 'preset-default',
                        params: {
                          overrides: {
                            removeViewBox: false,
                          },
                        },
                      },
                    ],
                  },
                ],
              ],
            },
          },
        }),
      ],

      // Split chunks for better caching
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          // Vendor libraries (node_modules)
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 20,
            reuseExistingChunk: true,
          },
          // Bootstrap specific (large library)
          bootstrap: {
            test: /[\\/]node_modules[\\/](bootstrap|@popperjs)[\\/]/,
            name: 'bootstrap',
            priority: 30,
            reuseExistingChunk: true,
          },
          // SweetAlert2
          sweetalert: {
            test: /[\\/]node_modules[\\/]sweetalert2[\\/]/,
            name: 'sweetalert',
            priority: 30,
            reuseExistingChunk: true,
          },
          // Common code shared between chunks
          common: {
            minChunks: 2,
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      },

      // Runtime chunk for better long-term caching
      runtimeChunk: {
        name: 'runtime',
      },

      // Module IDs for stable caching
      moduleIds: 'deterministic',
    },
    performance: {
      hints: isProduction ? 'warning' : false,
      maxEntrypointSize: 512000, // 500kb
      maxAssetSize: 512000,
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 9000,
      open: true,
      hot: true,
      watchFiles: ['./src/**/*.html'],
      historyApiFallback: true,
    },
  };
};