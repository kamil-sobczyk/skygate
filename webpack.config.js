const config = {
  server: {
    host: 'localhost',
    port: 3330,
  },
};

const webpack = require('webpack');
const path = require('path');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const styledComponentsTransformer = createStyledComponentsTransformer();

const env = process.env.NODE_ENV;
const isProd = env === 'production';
const isDevAsync = env === 'async-ts';
const isAnalyzer = env === 'analyzer';

const plugins = [];
const minimizer = [];
if (isAnalyzer) {
  plugins.push(
    ...[
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'bundle.html',
      }),
    ],
  );
}

if (isProd) {
  plugins.push(
    ...[
      new UglifyjsWebpackPlugin(),
      new CompressionPlugin({
        test: /\.css$|\.js(\?.*)?$/i,
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
      new CleanWebpackPlugin(),
    ],
  );
  minimizer.push(...[new OptimizeCSSAssetsPlugin({})]);
}

if (isDevAsync) {
  plugins.push(
    ...[
      new ForkTsCheckerWebpackPlugin({
        memoryLimit: 8192,
        workers: 1,
      }),
    ],
  );
}

plugins.push(
  ...[
    new HtmlWebpackPlugin({
      inject: true,
      template: `${path.resolve(path.join(__dirname, 'html/index.html'))}`,
      filename: 'index.html',
      minify: isProd
        ? {
            collapseWhitespace: true,
            preserveLineBreaks: true,
            removeComments: true,
            caseSensitive: true,
          }
        : false,
    }),
    new webpack.DefinePlugin({
      GLOBAL_ENV: JSON.stringify(env),
    }),
  ],
);

let tsLoaderOptions = {
  allowTsInNodeModules: true,
  transpileOnly: isDevAsync,
  experimentalWatchApi: true,
};

if (!isProd) {
  tsLoaderOptions = {
    ...tsLoaderOptions,
    getCustomTransformers: () => ({before: [styledComponentsTransformer]}),
  };
}

module.exports = {
  entry: {
    app: './src/index',
  },
  mode: isProd ? 'production' : 'development',
  output: {
    filename: `[name].[contenthash]${isProd ? '.min' : ''}.js`,
    path: path.resolve(path.join(__dirname, 'web')),
  },
  devtool: !isProd && 'source-map',
  devServer: {
    host: config.server.host,
    port: config.server.port,
    open: !isAnalyzer,
    historyApiFallback: true,
    disableHostCheck: true,
    contentBase: path.join(__dirname, 'web'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [path.join(__dirname, 'node_modules')],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: tsLoaderOptions,
      },
      {
        test: /\.scss$/,
        enforce: 'pre',
        loaders: ['import-glob-loader2'],
      },
      {
        test: /\.s?css$/,
        loaders: [
          isProd
            ? MiniCssExtractPlugin.loader
            : {
                loader: 'style-loader',
                options: {
                  insertAt: 'top',
                },
              },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.eot$/,
        loader: 'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=fonts/[name].[ext]',
      },
      {
        test: /\.(svg|zip)$/i,
        loader: 'base64-inline-loader',
      },
      {
        test: /\.[ot]tf$/,
        loader: 'url-loader?limit=65000&mimetype=application/octet-stream&name=fonts/[name].[ext]',
      },
      {
        test: /\.woff$/,
        loader: 'url-loader?limit=65000&mimetype=application/font-woff&name=fonts/[name].[ext]',
      },
      {
        test: /\.woff2$/,
        loader: 'url-loader?limit=65000&mimetype=application/font-woff2&name=fonts/[name].[ext]',
      },
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 128000,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        loader: 'base64-inline-loader',
      },
      {
        test: /\.html$/,
        loader: 'underscore-template-loader',
      },
    ],
  },
  optimization: {
    minimizer,
  },
  plugins,
};
