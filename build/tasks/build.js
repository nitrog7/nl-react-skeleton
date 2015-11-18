import gulp from 'gulp';
import runSequence from 'gulp-run-sequence';

gulp.task('default', ['dev']);
gulp.task('dev', (done) => {
  runSequence(
    'clean',
    'css:watch',
    'server:dev',
    done
  );
});

gulp.task('release', (done) => {
  runSequence(
    'compile',
    'server:release',
    done
  );
});

gulp.task('compile', (done) => {
  runSequence(
    'clean',
    ['css:release', 'js:release'],
    done
  );
});
