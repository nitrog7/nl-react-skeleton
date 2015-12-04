import gulp from 'gulp';
import config from '../config';
import plumber from 'gulp-plumber';
import util from 'gulp-util';
import jest from 'jest-cli';
import eslint from 'gulp-eslint';

// Tests
// Run all javascript tests
gulp.task('test', ['js:hint', 'js:jest']);

// Jest
gulp.task('js:jest', cb => {
  let onComplete = () => {
    cb();
  };

  jest.runCLI({
    verbose: true,
    config: {
      rootDir: './',
      //collectCoverage: true,
      scriptPreprocessor: './preprocessor.js',
      unmockedModulePathPatterns: [
        'node_modules/react',
        'node_modules/react-dom',
        'node_modules/react-addons-test-utils'
      ],
      testDirectoryName: config.directories.test,
      testPathIgnorePatterns: [
        'node_modules'
      ],
      moduleFileExtensions: [
        'es6',
        'js',
        'json',
        'react'
      ],
      testFileExtensions: [
        'es6',
        'js'
      ]
    }
  }, __dirname, onComplete);
});

// Lint
gulp.task('js:hint', () => {
  return gulp.src(config.path.src.js)
    .pipe(plumber({errorHandler: util.log}))
    .pipe(eslint.format());
});