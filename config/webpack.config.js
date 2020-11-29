const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const rootDir = path.resolve(__dirname, "../");
const publicPath = "/";
console.log("redux", path.join(rootDir, "src", "redux"));
module.exports = {
  entry: {
    app: path.join(rootDir, "src", "index.js"),
  },
  output: {
    path: path.join(rootDir, "dist"),
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
  },
  mode: "development",
  devServer: {
    port: 8080,
    hot: true,
    disableHostCheck: true,
    historyApiFallback: true,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      name: false,
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
  },
  resolve: {
    extensions: [".jsx", ".js", ".json", ".mjs"],
    alias: {
      Store: path.join(rootDir, "src", "redux"),
      Api: path.join(rootDir, "src", "api"),
      Components: path.join(rootDir, "src", "components"),
      Configs: path.join(rootDir, "src", "configs"),
      Pages: path.join(rootDir, "src", "pages"),
      Utils: path.join(rootDir, "src", "utils"),
      Services: path.join(rootDir, "src", "services"),
      Helpers: path.join(rootDir, "src", "helpers"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js|mjs)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: [
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-syntax-dynamic-import",
                "@babel/plugin-transform-runtime",
              ],
            },
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: [
          {
            loader: `file-loader?name=[name].[ext]&esModule=false&publicPath=${publicPath}`,
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: [
          {
            loader: `file-loader?name=[name].[ext]&esModule=false&publicPath=${publicPath}`,
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(rootDir, "public", "index.html"),
    }),
  ],
  target: "web",
};
