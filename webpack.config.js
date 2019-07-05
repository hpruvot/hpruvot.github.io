const path = require('path');
const glob = require('glob');
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
    'title': 'We helped a leading OEM to significantly increase its mean time between repair (MTBR)',
    'metaTitle': 'Increase mean time between repair using polymer labby seals | MCAM',
    'description': 'After 15 years of service in a natural gas compressor, the MCAM\'s Duratron T4540 PAI polymer seals are similar to new ones.',
    'url': 'we-helped-a-leading-oem-significantly-increase-their-mean-time-between-repair',
    'authorName': 'Frank Olmos',
    'authorJob': 'Global Market Segment Manager',
    'authorImg': 'frank-olmos.png',
    'date': 'June 2019',
    'img': 'client-story-1'
  },
  {
    'title': '3% compressor flow improvement achieved with polymer seal use in centrifugal compressors',
    'metaTitle': '3% compressor flow improvement achieved with polymer seal use in centrifugal compressors',
    'description': '3% compressor flow improvement achieved with polymer seal use in centrifugal compressors',
    'url': '3-compressor-flow-improvement-achieved-with-polymer-seal-use-in-centrifugal-compressors',
    'authorName': 'Frank Olmos',
    'authorJob': 'Global Market Segment Manager',
    'authorImg': 'frank-olmos.png',
    'date': 'July 2019',
    'img': 'client-story-2'
  },
  {
    'title': 'Incremental horsepower achieved with Fluorosint® 500 on rotor shrouds thanks to better clearance',
    'metaTitle': 'Incremental horsepower achieved with Fluorosint® 500 on rotor shrouds thanks to better clearance',
    'description': 'Incremental horsepower achieved with Fluorosint® 500 on rotor shrouds thanks to better clearance',
    'url': 'incremental-horsepower-achieved-with-fluorosint-500-on-rotor-shrouds-thanks-to-better-clearance',
    'authorName': 'Frank Olmos',
    'authorJob': 'Global Market Segment Manager',
    'authorImg': 'frank-olmos.png',
    'date': 'June 2019',
    'img': 'client-story-3'
  }
];

const articles = [
  {
    'title': 'Mitsubishi Chemical Advanced Materials Acquires Advanced Polymer Technologies',
    'metaTitle': 'Acquisition : Advanced polymer technology | MCAM',
    'description': 'Mitsubishi Chemical Advanced Solutions acquires the Advanced Poylmer Technology',
    'url': 'mitsubishi-chemical-advanced-materials-acquires-advanced-polymer-technologies',
    'date': '03.06.2019',
    'thumbnail': 'home-article-1',
    'img': 'article-1'
  },
  {
    'title': 'Come Join Mitsubishi Chemcial Advanced Material at K 2019',
    'metaTitle': 'Meet us at K 2019 | Mitsubishi Chemical Advanced Solutions',
    'description': 'Meet us at trade fair for plastics and rubber in Düsseldorf in October 2019 and discover our latest innovations in advanced polymer solutions',
    'url': 'come-join-mitsubishi-chemical-advanced-material-at-k-2019',
    'date': '28.6.2019',
    'thumbnail': 'home-article-2',
    'img': 'article-2'
  },
  {
    'title': 'Quadrant Changes Name to Mitsubishi Chemical Advanced Materials as of April 1, 2019 ',
    'metaTitle': 'Quadrant becomes Mitsubishi Chemical Advanced Materials | MCAM',
    'description': 'Quadrant becomes MCAM and will continue to enhance its high-performance thermoplastics materials and strive to realize KAITEKI',
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
      'metaTitle': clientStory.metaTitle,
      'description': clientStory.description,
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
      'metaTitle': article.metaTitle,
      'description': article.description,
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
        loader: 'handlebars-loader',
        options: {
          knownHelpersOnly: false
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
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
        'title': 'Oil and gas polymer solutions| Mitsubishi Chemical Advanced Materials',
        'metaTitle': 'Oil and gas polymer solutions| Mitsubishi Chemical Advanced Materials',
        'description': 'Mitsubishi chemical advanced materials provides taylor made solutions for Oil and Gas compressors and pumps such as labyrinth seals, valves.',
        'articles': articles,
        'clientStories': clientStories
      }
    }),
    new HtmlWebpackPlugin({
      template: './src/client-stories.hbs',
      filename: 'client-stories.html',
      templateParameters: {
        'title': 'Client stories in Oil and Gas industry using polymers solutions | MCAM',
        'metaTitle': 'Client stories in Oil and Gas industry using polymers solutions | MCAM',
        'description': 'Discover case studies based on client succes stories using taylor made polymer solutions and labby seals',
        'articles': clientStories
      }
    }),
    new HtmlWebpackPlugin({
      template: './src/our-solutions.hbs',
      filename: 'our-solutions.html',
      templateParameters: {
        'title': 'Our polymers solutions and products for Oil and Gas industry | MCAM',
        'metaTitle': 'Our polymers solutions and products for Oil and Gas industry | MCAM',
        'description': 'Discover all products and taylor made solutions for extrem requirements such as high temperature, high pressure (HTHP), chemical resistance and tolerance.'
      }
    }),
    new HtmlWebpackPlugin({
      template: './src/contact.hbs',
      filename: 'contact.html',
      templateParameters: {
        'title': 'Contact us | Mitsubishi Chemical Advanced Solutions',
        'metaTitle': 'Contact us | Mitsubishi Chemical Advanced Solutions',
        'description': 'Contact one of our business development engineers to help you find the best solution for your activity'

      }
    }),
    new HtmlWebpackPlugin({
      template: './src/404.hbs',
      filename: '404.html',
      templateParameters: {
        'title': '404',
        'metaTitle': 'Error 404',
        'description': 'Error 404'
      }
    }),
    new HtmlWebpackPlugin({
      template: './src/privacy-notice.hbs',
      filename: 'privacy-notice.html',
      templateParameters: {
        'title': 'Privacy Notice',
        'metaTitle': 'Privacy policies | Mitsubishi Chemical Advanced Solutions',
        'description': 'Data protection and security are important to Mitsubishi Chemical Advanced Materials AG (MCAM) and its group companies ("MCAM"; "we")'
      }
    }),
    new HtmlWebpackPlugin({
      template: './src/terms-of-use.hbs',
      filename: 'terms-of-use.html',
      templateParameters: {
        'title': 'Terms of Use',
        'metaTitle': 'Legal | Mitsubishi Chemical Advanced Solutions',
        'description': 'This web site (mcam.com; herein referred to as the "Site") is provided by MITSUBISHI CHEMICAL ADVANCED MATERIALS AG (MCAM) and its group companies'
      }
    }),
    new HtmlWebpackPlugin({
      template: './src/white-paper.hbs',
      filename: 'white-paper.html',
      templateParameters: {
        'title': 'Download our white paper on the effects of processing on thermoplastics',
        'metaTitle': 'Download our white paper on the effects of processing on thermoplastics | MCAM',
        'description': 'This paper focuses on how the processing of thermoplastics impacts physical properties, theories behind the differences, and the availability of various materials for use in prototypes or production.'
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
