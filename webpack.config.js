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
  style: './src/assets/scss/app.scss',
  contact: './src/assets/scss/contact-form.scss'
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
    'title': '3% compressor flow improvement achieved with polymer seals in centrifugal compressors',
    'metaTitle': '3% compressor flow improvement achieved with polymer seals in centrifugal compressors',
    'description': '3% compressor flow improvement achieved with polymer seals in centrifugal compressors',
    'url': '3-compressor-flow-improvement-achieved-with-polymer-seals-in-centrifugal-compressors',
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

const ourSolutions = [
  {
    'metaTitle': 'Portfolio of Materials & Processing Solutions',
    'metaDescription': 'Mitsubishi Chemical Advanced Materials is the leader in Engineered Solutions to the compressor and pump market . We engage in material selection.',
    'thumbnailTitle': 'Portfolio of Materials & Processing Solutions',
    'thumbnailDescription': [
      {
        'item': 'Material Triangle',
      },
      {
        'item': 'Most Commonly Used',
      },
      {
        'item': 'Our Full Product Line'
      }
    ],
    'title': 'Portfolio of materials and processing solutions',
    'url': 'portfolio-of-materials-and-processing-solutions',
    'img': 'solution-1'
  },
  {
    'metaTitle': 'Production Parts',
    'metaDescription': 'With our engineered solutions, we provide our high tech and diversified customer base with complete solutions to their engineering and finished component needs.  We do this by combining their experience, engineering, material science, andtechnology to produce high quality plastic and metal parts that meet exact specifications.',
    'thumbnailTitle': 'Production Parts',
    'thumbnailDescription': [
      {
        'item': 'CNC Machining',
      },
      {
        'item': 'Injection Moldin',
      },
      {
        'item': 'Vertical Integration'
      },
    ],
    'title': 'Production Parts',
    'url': 'production-parts',
    'img': 'solution-2'
  },
  {
    'metaTitle': 'Rapid Prototyping ',
    'metaDescription': 'Mitsubishi Chemical Advanced Materials is a leader in Engineered Solutions for the Oil & Gas industry. We strive to give the best customer service possible when designing and creating finished parts. Starting from the design phase with the customer, we engage in material selection, rapid prototyping to production and assembly.',
    'thumbnailTitle': 'Rapid Prototyping ',
    'thumbnailDescription': [
      {
        'item': 'Tight Tolerance'
      },
      {
        'item': 'CNC Turning'
      },
      {
        'item': 'Proprietary 3D Printed Technology'
      },
    ],
    'title': 'Rapid Prototyping for Additive Manufacturing, CNC Machining, & Injection Molding',
    'url': 'rapid-prototyping',
    'img': 'solution-3'
  },
  {
    'metaTitle': 'R&D Innovations',
    'metaDescription': 'Mitsubishi Chemical Advanced Materials Research and Development team is continuously working together with our market segment managers to develop new and exciting materials. With our MSM in the field, we are able to better understand what materials and processes are needed for the industry.',
    'thumbnailTitle': 'R&D Innovations',
    'thumbnailDescription': [
      {
        'item': 'Latest Innovations'
      },
      {
        'item': 'Near Net Shape Technology'
      },
      {
        'item': 'Constant material under development'
      },
    ],
    'title': 'R&D Innovations',
    'url': 'rd-innovations',
    'img': 'solution-4'
  },
];

const ourApplications = [
  {
    'metaTitle': 'Labyrinth Seals',
    'metaDescription': 'Discover why our polymer seals are better than metal seals.',
    'thumbnailTitle': 'Labyrinth Seals',
    'thumbnailDescription': 'Discover why our polymer seals are better than metal seals.',
    'title': 'The Effects of Corrosion on Labyrinth Seals',
    'url': 'the-effects-of-corrosion-on-labyrinth-seals',
    'img': 'application-1'
  },
  {
    'metaTitle': 'Poppets, Valve Plates, Back Up Rings & Connectors',
    'metaDescription': 'Learn more about our poppets, valve plates, back up rings & connectors.',
    'thumbnailTitle': 'Poppets, Valve Plates, Back Up Rings & Connectors',
    'thumbnailDescription': 'Learn more about our poppets, valve plates, back up rings & connectors.',
    'title': 'Poppets, Valve Plates, Back Up Rings & Connectors',
    'url': 'poppets-valve-plates-back-up-rings-connectors',
    'img': 'application-2'
  },
  {
    'metaTitle': 'Biodegradable and Dissolvable Polymers',
    'metaDescription': 'Discover how our biodegradable polymer has better mechanical properties than others.',
    'thumbnailTitle': 'Frac Plug',
    'thumbnailDescription': 'Discover how our biodegradable polymer has better mechanical properties than others.',
    'title': 'Biodegradable and Dissolvable Polymers',
    'url': 'biodegradable-and-dissolvable-polymers',
    'img': 'application-3'
  }
]

let clientStoriesHtmlPlugins = clientStories.map(function (clientStory) {
  return new HtmlWebpackPlugin({
    filename: 'client-stories/' + clientStory.url + '.html',
    template: __dirname + `/src/templates/stories/${clientStory.url}.hbs`,
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
    },
    excludeChunks: ['contact']
  })
});

let ourApplicationsHtmlPlugins = ourApplications.map(function (ourApplication) {
  return new HtmlWebpackPlugin({
    filename: 'our-applications/' + ourApplication.url + '.html',
    template: __dirname + `/src/templates/applications/${ourApplication.url}.hbs`,
    templateParameters: {
      'metaTitle': ourApplication.metaTitle,
      'metaDescription': ourApplication.metaDescription,
      'thumbnailTitle': ourApplication.thumbnailTitle,
      'thumbnailDescription': ourApplication.thumbnailDescription,
      'title': ourApplication.title,
      'url': ourApplication.url,
      'img': ourApplication.img,
      'otherApplications': ourApplications
    },
    excludeChunks: ['contact']
  })
});

let ourSolutionsHtmlPlugins = ourSolutions.map(function (ourSolution) {
  return new HtmlWebpackPlugin({
    filename: 'our-solutions/' + ourSolution.url + '.html',
    template: __dirname + `/src/templates/solutions/${ourSolution.url}.hbs`,
    templateParameters: {
      'metaTitle': ourSolution.metaTitle,
      'metaDescription': ourSolution.metaDescription,
      'thumbnailTitle': ourSolution.thumbnailTitle,
      'thumbnailDescription': ourSolution.thumbnailDescription,
      'title': ourSolution.title,
      'url': ourSolution.url,
      'img': ourSolution.img,
    },
    excludeChunks: ['contact']
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
      template: './src/templates/index.hbs',
      filename: 'index.html',
      templateParameters: {
        'title': 'Oil and gas polymer solutions| Mitsubishi Chemical Advanced Materials',
        'metaTitle': 'Oil and gas polymer solutions| Mitsubishi Chemical Advanced Materials',
        'description': 'Mitsubishi chemical advanced materials provides taylor made solutions for Oil and Gas compressors and pumps such as labyrinth seals, valves.',
        'clientStories': clientStories,
        'ourApplications': ourApplications,
        'ourSolutions': ourSolutions
      },
      excludeChunks: ['contact']
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/client-stories.hbs',
      filename: 'client-stories.html',
      templateParameters: {
        'title': 'Client stories in Oil and Gas industry using polymers solutions | MCAM',
        'metaTitle': 'Client stories in Oil and Gas industry using polymers solutions | MCAM',
        'description': 'Discover case studies based on client succes stories using taylor made polymer solutions and labby seals',
        'articles': clientStories
      },
      excludeChunks: ['contact']
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/our-applications.hbs',
      filename: 'our-applications.html',
      templateParameters: {
        'title': 'Our Applications for Compressors & Pumps',
        'metaTitle': 'Our Applications for Compressors & Pumps',
        'description': 'Mitsubishi Chemical Advanced Materials is the leader for engineered solutions to the compressor and pump market. We engage in material selection, designing, prototyping, providing advanced polymer stock shapes and finished parts.',
        'ourApplications': ourApplications
      },
      excludeChunks: ['contact']
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/our-solutions.hbs',
      filename: 'our-solutions.html',
      templateParameters: {
        'metaTitle': 'Our polymers solutions and products for Oil and Gas industry | MCAM',
        'description': 'Discover all products and taylor made solutions for extrem requirements such as high temperature, high pressure (HTHP), chemical resistance and tolerance.',
        'title': 'Our Engineered Solutions',
        'ourSolutions': ourSolutions
      },
      excludeChunks: ['contact']
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/contact.hbs',
      filename: 'contact.html',
      templateParameters: {
        'title': 'Contact us | Mitsubishi Chemical Advanced Solutions',
        'metaTitle': 'Contact us | Mitsubishi Chemical Advanced Solutions',
        'description': 'Contact one of our business development engineers to help you find the best solution for your activity'

      },
      excludeChunks: ['contact']
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/thanks.hbs',
      filename: 'thanks.html',
      templateParameters: {
        'title': 'Thanks for contacting us!',
        'metaTitle': 'Thank you | Mitsubishi Chemical Advanced Solutions',
        'description': 'Thanks for contacting us. We will be in touch with you shortly.'

      },
      excludeChunks: ['contact']
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/404.hbs',
      filename: '404.html',
      templateParameters: {
        'title': '404',
        'metaTitle': 'Error 404',
        'description': 'Error 404'
      },
      excludeChunks: ['contact']
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/privacy-notice.hbs',
      filename: 'privacy-notice.html',
      templateParameters: {
        'title': 'Privacy Notice',
        'metaTitle': 'Privacy policies | Mitsubishi Chemical Advanced Solutions',
        'description': 'Data protection and security are important to Mitsubishi Chemical Advanced Materials AG (MCAM) and its group companies ("MCAM"; "we")'
      },
      excludeChunks: ['contact']
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/terms-of-use.hbs',
      filename: 'terms-of-use.html',
      templateParameters: {
        'title': 'Terms of Use',
        'metaTitle': 'Legal | Mitsubishi Chemical Advanced Solutions',
        'description': 'This web site (mcam.com; herein referred to as the "Site") is provided by MITSUBISHI CHEMICAL ADVANCED MATERIALS AG (MCAM) and its group companies'
      },
      excludeChunks: ['contact']
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/white-paper.hbs',
      filename: 'white-paper.html',
      templateParameters: {
        'title': 'Learn more about the effects of processing on thermoplastics',
        'metaTitle': 'Learn more about the effects of processing on thermoplastics | MCAM',
        'description': 'This paper focuses on how the processing of thermoplastics impacts physical properties, theories behind the differences, and the availability of various materials for use in prototypes or production.'
      },
      excludeChunks: ['contact']
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
  ].concat(clientStoriesHtmlPlugins).concat(ourApplicationsHtmlPlugins).concat(ourSolutionsHtmlPlugins),
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
