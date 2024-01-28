import { merge } from 'webpack-merge';
import config from './webpack.common.js';

export default merge(config, {
  mode: 'production',
  output: {
    path: config.output.path,
  },
  module: {
    rules: [
      /* babel loader */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
    ],
  },
});
