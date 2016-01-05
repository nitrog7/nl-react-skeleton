// Karma configuration
import config from './build/config';

module.exports = function(cfg) {
  cfg.set({
    // List of files / patterns to load in the browser
    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      config.path.test.unit
    ],

    // List of files to exclude
    exclude: [],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Web server port
    port: 9876,

    // Enable / disable colors in the output (reporters and logs)
    colors: true,

    // Base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // Frameworks to use
    // Available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
      'mocha', 'chai-sinon'
    ],

    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-coverage',
      'karma-phantomjs-launcher',
      'karma-chai-sinon',
      'karma-spec-reporter',
      'karma-sourcemap-loader'
    ],

    // Preprocess matching files before serving them to the browser
    // Available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      [config.path.test.unit]: ['webpack', 'sourcemap'],
      [config.path.src.js]: ['webpack', 'sourcemap', 'coverage']
    },

    // Level of logging
    // Possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Start these browsers
    // Available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Test results reporter to use
    // Possible values: 'dots', 'progress'
    // Available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'coverage'],

    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html', subdir: 'report-html' }
      ]
    },

    // Webpack
    webpack: {
      devtool: 'inline-source-map',
      resolve: config.webpack.resolve,
      plugins: config.webpack.plugins
        .filter(p => !p.__KARMA_IGNORE__),
      module: {
        loaders: config.webpack.module.loaders,
        postLoaders: [{
          test: /\.(js|jsx)$/, exclude: /(node_modules|tests)/,
          loader: 'istanbul-instrumenter'
        }]
      }
    },
    webpackMiddleware: {
      noInfo: true
    }
  });
};
