const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

const copyFiles = new CopyWebpackPlugin([
  {
    from: path.resolve(__dirname, 'src/assets/fonts'),

    to: 'fonts',
    test: /\.(woff|woff2|eot|ttf|svg)$/
  },
  {
    from: path.resolve(__dirname, 'src/assets/img'),

    to: 'img'
  },
  {
    from: path.resolve(__dirname, 'src/assets/files'),

    to: 'files'
  },
  {
    from: path.resolve(__dirname, 'src/assets/icons/symbol-defs.svg'),

    to: ''
  }
]);

const entry = {
  index: './src/assets/js/index.js',
  style: './src/assets/scss/app.scss'
};

const extractSass = new MiniCssExtractPlugin({
  filename: 'css/[name].css',
});

const clientStories = [
  {
    'title': 'We helped a leading OEM significantly increase their mean time between repair (MTBR)',
    'url': 'we-helped-a-leading-oem-significantly-increase-their-mean-time-between-repair',
    'authorName': 'Frank Olmos',
    'authorJob': 'Global Market Segment Manager',
    'authorImg': 'frank-olmos.png',
    'date': 'June 2019',
    'img': 'client-story-1'
  },
  {
    'title': 'KSHOW - Get your free pass and meet our experts',
    'url': 'get-your-free-pass-and-meet-our-experts',
    'authorName': 'Frank Olmos',
    'authorJob': 'Global Market Segment Manager',
    'authorImg': 'frank-olmos.png',
    'date': 'June 2019',
    'img': 'client-story-1',
  },
  {
    'title': 'MCAM wins the "Labby of the Year" 1rst price',
    'url': 'mcam-wins-the-labby-of-the-year',
    'authorName': 'Frank Olmos',
    'authorJob': 'Global Market Segment Manager',
    'authorImg': 'frank-olmos.png',
    'date': 'June 2019',
    'img': 'client-story-1',
  }
];

const articles = [
  {
    'title': 'Mitsubishi Chemical Advanced Materials Acquires Advanced Polymer Technologies',
    'url': 'mitsubishi-chemical-advanced-materials-acquires-advanced-polymer-technologies',
    'date': '03.06.2019',
    'thumbnail': 'home-article-1',
    'img': 'article-1'
  },
  {
    'title': 'Meet us at K 2019 | Mitsubishi Chemical Advanced Solutions',
    'url': 'come-join-mitsubishi-chemical-advanced-material-at-k-2019',
    'date': '28.6.2019',
    'thumbnail': 'home-article-2',
    'img': 'article-2'
  },
  {
    'title': 'Quadrant becomes Mitsubishi Chemical Advanced Materials | MCAM',
    'url': 'quadrant-changes-name-to-mitsubishi-chemical-advanced-materials-as-of-april-1-2019',
    'date': '25.02.2019',
    'thumbnail': 'home-article-3',
    'img': 'article-3'
  }
]

let clientStoriesHtmlPlugins = clientStories.map(function (clientStory) {
  return new HtmlWebpackPlugin({
    filename: 'client-stories/' + clientStory.url + '.html',
    template: __dirname + `/src/${clientStory.url}.hbs`,
    templateParameters: {
      'title': clientStory.title,
      'img': clientStory.img,
      'authorName': clientStory.authorName,
      'authorJob': clientStory.authorJob,
      'authorImg': clientStory.authorImg,
      'date': clientStory.date,
      'otherStories': clientStories
    }
  })
});

let articlesHtmlPlugins = articles.map(function (article) {
  return new HtmlWebpackPlugin({
    filename: 'articles/' + article.url + '.html',
    template: __dirname + `/src/${article.url}.hbs`,
    templateParameters: {
      'title': article.title,
      'url': article.url,
      'date': article.date,
      'thumbnail': article.thumbnail,
      'img': article.img,
      'otherArticles': articles
    }
  })
});

module.exports = {
  entry,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './'),
  },
  devtool: isDevelopment && "source-map",
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
        test: /\.hbs$/, 
        loader: 'handlebars-loader'
      },
      {
        test: /\.css$/,
        use: ['css-loader']
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')({
                'browsers': ['last 5 versions']
              })]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'compressed'
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ]
      }
    ]
  },
  plugins: [
    copyFiles,
    extractSass,
    new HtmlWebpackPlugin({
      template: './src/index.hbs',
      filename: 'index.html',
      templateParameters: {
        'title': 'Oil and gas polymer materials | Mitsubishi Chemical Advanced Solutions',
        'articles': articles,
        'clientStories': clientStories
      }
    }),
    new HtmlWebpackPlugin({
      template: './src/client-stories.hbs',
      filename: 'client-stories.html',
      templateParameters: {
        'title': 'Client stories in Oil and Gas industry using polymers solutions | MCAM',
        'articles': clientStories
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Our polymers solutions for Oil and Gas | MCAM',
      template: './src/our-solutions.hbs',
      filename: 'our-solutions.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Contact',
      template: './src/contact.hbs',
      filename: 'contact.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/404.hbs',
      filename: '404.html',
      templateParameters: {
        'title': '404'
      }
    }),
    new HtmlWebpackPlugin({
      template: './src/privacy-notice.hbs',
      filename: 'privacy-notice.html',
      templateParameters: {
        'title': 'Privacy Notice'
      }
    }),
    new HtmlWebpackPlugin({
      template: './src/terms-of-use.hbs',
      filename: 'terms-of-use.html',
      templateParameters: {
        'title': 'Terms of Use'
      }
    }),
    new BrowserSyncPlugin(
      {
        // browse to http://localhost:3000/ during development,
        // ./public directory is being served
        host: 'localhost',
        server: { baseDir: ['./'] }
      }, {
        // prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
        reload: true
      }
    )
  ].concat(clientStoriesHtmlPlugins).concat(articlesHtmlPlugins),
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCssAssetsPlugin({})
    ]
  }
}
