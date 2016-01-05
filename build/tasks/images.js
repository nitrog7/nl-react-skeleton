import gulp from 'gulp';
import config from '../config';
import plumber from 'gulp-plumber';
import util from 'gulp-util';
import image from 'gulp-image';

gulp.task('img:dev', () => {
  return gulp.src(config.path.src.img)
    .pipe(plumber({errorHandler: util.log}))
    .pipe(gulp.dest(config.path.dist.img));
});

gulp.task('img:watch', ['img:dev'], () => {
  return gulp.watch(config.path.src.img, ['img:dev']);
});

gulp.task('img:release', () => {
  return gulp.src(config.path.src.img.files)
    .pipe(plumber({errorHandler: util.log}))
    .pipe(image())
    .pipe(gulp.dest(config.directories.dist));
});
