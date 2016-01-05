import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('default', ['dev']);
gulp.task('dev', (done) => {
  runSequence(
    'clean',
    ['css:watch', 'img:watch'],
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
