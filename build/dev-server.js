import gulp from 'gulp';
import util from 'gulp-util';
import config from './config';
import appPackage from '../package.json';

const version = appPackage.version;
const app = express();
const server = require('http').Server(app);
const port = config.port.dev;

// Express
import express from 'express';
import history from 'connect-history-api-fallback';
import bodyParser from 'body-parser';

// Webpack
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// Falcor
import falcor from 'falcor';
import falcorExpress from 'falcor-express';
import router from '../model/router';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(history());

// Static files
app.use(express.static(config.absolute(config.directories.dist)));

// Falcor route
app.use('/' + config.falcor.endpoint, falcorExpress.dataSourceRoute((req, res) => {
  return new router('FAKE_USER_SESSION_KEY');
}));

// Webpack middleware
config.webpack.devtool = 'eval';
config.webpack.debug = true;
config.webpack.eslint.emitWarning = true;
config.webpack.entry.app.push(
  'webpack-hot-middleware/client'
);
config.webpack.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development'),
    APP_VERSION: JSON.stringify(version)
  })
);
config.webpack.module.loaders = [
  {
    loader: 'babel',
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    query: {
      cacheDirectory: true,
      stage: 0,
      optional: [
        'es7.classProperties'
      ],
      plugins: ['react-transform'],
      extra: {
        'react-transform': {
          transforms: [
            {
              transform: 'react-transform-hmr',
              imports: ['react'],
              locals: ['module']
            }, {
              transform: 'react-transform-catch-errors',
              imports: ['react', 'redbox-react']
            }
          ]
        }
      }
    }
  }
];

let compiler = webpack(config.webpack, error => {
  if(error) {
    throw new util.PluginError('webpack', error);
  }
});

app.use(webpackDevMiddleware(compiler, {
  contentBase: config.directories.src,
  publicPath: 'http://localhost:' + config.port.dev + '/',
  hot: true,
  inline: true,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  },
  lazy: false,
  noInfo: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
}));

app.use(webpackHotMiddleware(compiler, {
  log: util.log,
  reload: true
}));

// Dynamic SPA route
app.use('*', (req, res) => {
  res.sendFile(config.absolute(config.directories.src, config.filenames.index));
});

// Run server on default port
server
  .listen(port, function() {
    util.log('---------------------------------------');
    util.log('Local: http://localhost:%d', server.address().port);
    util.log('---------------------------------------');
  })
  .on('error', function(error) {
    util.log('[express]', error.message);
  });
