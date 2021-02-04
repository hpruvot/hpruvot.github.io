const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const isDevelopment = process.env.ENV !== 'production';

const copyFiles = new CopyWebpackPlugin({
  patterns: [
    { from: path.resolve(__dirname, 'index.html'), to: '' },
    { from: path.resolve(__dirname, 'src/assets/fonts'), to: 'fonts' },
  ],
});

const entry = {
  script: './src/assets/js/index.js',
	style: './src/assets/scss/index.scss',
};

module.exports = {
	mode: process.env.ENV,
  entry,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
      test: /\.scss$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'css/[name].css',
						}
					},
					{
						loader: 'extract-loader'
					},
					{
						loader: 'css-loader?-url'
					},
					{
						loader: 'postcss-loader'
					},
					{
						loader: 'sass-loader'
					}
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
				loader: 'file-loader',
        options: {
					name: '[name].[ext]',
					outputPath: 'images',
        },
			},
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'file-loader',
        options: {
					name: '[name].[ext]',
          outputPath: 'fonts' 
        },
      }
    ]
  },
  //remove comments from JS files
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        }
      })
    ],
  },
  plugins: [
    copyFiles,
    new BrowserSyncPlugin(
      {
        host: 'localhost', // browse to http://localhost:3000/ during development,
        server: { baseDir: ['./dist'] } // ./build directory is being served
      }, {
        reload: true
      }
    ),
	],
	watch: isDevelopment === 'development',
}
