import gulp from 'gulp';
import util from 'gulp-util';
import config from '../config';
import appPackage from '../../package.json';

const version = appPackage.version;
const app = express();
const server = require('http').Server(app);

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
import router from '../../model/router';

//import exec from 'gulp-exec';
import childProcess from 'child_process';

gulp.task('server:dev', (done) => {
  let exec = childProcess.exec;
  let proc = exec('nodemon --watch model development.js');
  proc.stderr.on('data', (data) => {
    return process.stdout.write(data);
    done();
  });
  proc.stdout.on('data', (data) => {
    return process.stdout.write(data);
    done();
  });
});

gulp.task('server:release', done => {
  let port = config.port.release;

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

  // Dynamic SPA route
  app.use('*', (req, res) => {
    res.sendFile(config.absolute(config.directories.dist, config.filenames.index));
  });

  // Run server on default port
  server
    .listen(port, function() {
      util.log('---------------------------------------');
      util.log('Local: http://localhost:%d', server.address().port);
      util.log('---------------------------------------');
      done();
    })
    .on('error', function(error) {
      util.log('[express]', error.message);
    });
});