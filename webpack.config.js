import { resolve } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";

const config = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: resolve(process.cwd(), "dist"),
  },
  module: {
    rules: [
      /* style and css loader */
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      /* image file loader */
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    /* HTML Webpack Plugin */
    new HtmlWebpackPlugin({
      template: "./src/template.html",
      filename: "index.html",
    }),
  ],
  optimization: {
    minimizer: [new TerserPlugin()],
  },
};

export default config;
