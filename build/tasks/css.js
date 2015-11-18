import gulp from 'gulp';
import config from '../config';
import plumber from 'gulp-plumber';
import util from 'gulp-util';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import flatten from 'gulp-flatten';

gulp.task('css:dev', ['fonts'], () => {
  return gulp.src(config.path.src.scss.main)
    .pipe(plumber({errorHandler: util.log}))
    .pipe(sass(config.scss.dev))
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(gulp.dest(config.absolute(config.directories.dist)));
});

gulp.task('css:watch', ['css:dev'], () => {
  return gulp.watch(config.path.src.scss.files, ['css:dev']);
});

gulp.task('css:release', ['fonts'], () => {
  return gulp.src(config.path.src.scss.main)
    .pipe(plumber({errorHandler: util.log}))
    .pipe(sass(config.scss.dist))
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(gulp.dest(config.absolute(config.directories.dist)));
});

gulp.task('fonts', () => {
  return gulp.src(config.path.src.fonts.files)
    .pipe(plumber({errorHandler: util.log}))
    .pipe(flatten())
    .pipe(gulp.dest(config.absolute(config.path.dist.fonts)));
});
