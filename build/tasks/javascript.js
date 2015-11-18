import gulp from 'gulp';
import config from '../config';
import assign from 'object.assign';
import util from 'gulp-util';
import webpack from 'webpack';
import appPackage from '../../package.json';

gulp.task('js:release', function(done) {
  let version = appPackage.version;

  config.webpack.eslint.failOnError = true;
  config.webpack.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      minimize: {
        warnings: false
      },
      sourceMap: false,
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      APP_VERSION: JSON.stringify(version)
    })
  );

  // Run Webpack
  webpack(config.webpack, function(error, stats) {
    if(error) {
      throw new util.PluginError('webpack', error);
    }

    util.log('[webpack]', stats.toString({
      color: true
    }));

    done();
  });
});
