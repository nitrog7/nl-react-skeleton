import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import util from 'gulp-util';

let config = {
  env: process.env.NODE_ENV,
  port: {
    dev: 9000,
    release: 9000
  },

  filenames: {
    index: 'index.html'
  },

  directories: {
    src: 'src',
    dist: 'dist',
    test: 'test'
  }
};

// Utilities
const basePath = path.resolve(__dirname, '../');
config.absolute = (...args) => path.resolve.apply(path.resolve, [basePath, ...args]);
config.relative = (...args) => [...args].join('/');

config.path = {
  src: {
    entry: config.absolute(config.directories.src, 'main.js'),
    js: config.relative(config.directories.src, '**/*.js'),
    html: config.relative(config.directories.src, '**/*.html'),
    scss: {
      main: config.relative(config.directories.src, 'styles/core.scss'),
      files: [
        config.relative(config.directories.src, 'styles/**/*.scss')
      ],
      includes: []
    },
    img: [
      config.relative(config.directories.src, 'img/**/*.{png,jpg,gif,svg}'),
      config.relative(config.directories.src, 'views/**/*.{png,jpg,gif,svg}'),
      config.relative(config.directories.src, 'favicon.ico')
    ],
    fonts: {
      dir: config.relative(config.directories.src, 'fonts/'),
      files: [
        'node_modules/font-awesome/fonts/*.{otf,eot,svg,ttf,woff,woff2}'
      ]
    }
  },

  dist: {
    css: config.relative(config.directories.dist, 'css/'),
    fonts: config.relative(config.directories.dist, 'fonts/'),
    img: config.relative(config.directories.dist, 'img/')
  },

  tmp: 'tmp',
  doc: './doc',
  test: {
    e2e: config.relative(config.directories.test, 'e2e/**/*.js'),
    unit: config.relative(config.directories.test, 'unit/**/*.spec.js')
  }
};

// SCSS
config.scss = {
  dev: {
    errLogToConsole: true,
    outputStyle: 'expanded',
    includePaths: []
  },
  dist: {
    errLogToConsole: true,
    outputStyle: 'compressed',
    includePaths: []
  }
};

// Autoprefixer
config.autoprefixer = [
  'last 5 Chrome versions',
  'last 5 Firefox versions',
  'last 2 Safari versions',
  'Explorer >= 10'
];

// Karma
config.karma = {
  configFile: config.absolute('karma.conf.js')
};

// Documentation
config.yuidoc = {
  parser: {
    project: {
      name: "YUI Documentation",
      description: "YUIDoc documentation generated from JavaScript",
      version: "0.1.0",
      url: "http://yuilibrary.com/projects/yuidoc",
      logo: "http://yuilibrary.com/img/yui-logo.png",
      options: {
        external: {
          data: "http://yuilibrary.com/yui/docs/api/data.json"
        },
        linkNatives: true,
        attributesEmit: true,
        outdir: "docs/api"
      }
    }
  },
  render: {}
};

// Webpack Vendor chunk
const commonChunk = new webpack.optimize.CommonsChunkPlugin(
  'vendor', '[name].js'
);
commonChunk.__KARMA_IGNORE__ = true;

// Webpack config
config.webpack = {
  entry: {
    app: [
      config.path.src.entry
    ],
    vendor: [
      'history',
      'react',
      'react-router',
      'flux'
    ]
  },
  output: {
    filename: '[name].js',
    path: config.absolute(config.directories.dist),
    publicPath: './'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(config.env)
      },
      'NODE_ENV': config.env,
      '__DEV__': config.env === 'development',
      '__PROD__': config.env === 'production'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: config.absolute(config.directories.src, config.filenames.index),
      hash: false,
      filename: config.filenames.index,
      inject: 'body'
    }),
    commonChunk
  ],
  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx'],
    modulesDirectories: [
      config.directories.src,
      'web_loaders',
      'web_modules',
      'node_loaders',
      'node_modules'
    ],
    alias: [
      {actions: './' + config.directories.src + '/actions'},
      {components: './' + config.directories.src + '/components'},
      {constants: './' + config.directories.src + '/constants'},
      {dispatcher: './' + config.directories.src + '/dispatcher'},
      {services: './' + config.directories.src + '/services'},
      {stores: './' + config.directories.src + '/stores'},
      {styles: './' + config.directories.src + '/styles'},
      {utils: './' + config.directories.src + '/utils'},
      {views: './' + config.directories.src + '/views'},
      {test: './' + config.directories.test}
    ]
  },
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['eslint-loader']
      }
    ],
    loaders: [
      {
        loader: 'babel',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/
      }
    ]
  },
  eslint: {
    configFile: '.eslintrc'
  }
};

export default config;