const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const pages = require('./multiplePages')
const path = require("path");
const mode =
  process.env.NODE_ENV === "production" ? "production" : "development";

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename:'[name].[contenthash].js',
    assetModuleFilename: 'images/[hash][ext][query]',
    clean:true
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  },
  mode: mode,
  devtool:'source-map',
  plugins: [
    ...pages,
    new MiniCssExtractPlugin({
      filename:'[name].[contenthash].css'
    })],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          (mode === 'development') ? 'style-loader' : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                  ],
                ],
              },
            },
          },
          "sass-loader"
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.pug$/i,
        loader: "pug-loader",
        exclude:/(node_modules|bower-components)/
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  },
};

