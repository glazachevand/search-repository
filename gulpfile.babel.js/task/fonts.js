import gulp from 'gulp';
import browserSync from 'browser-sync';

// пути
import path from '../config/path.js';
// настройки плагинов
import app from '../config/app.js';

// Плагины
import loadPlugins from 'gulp-load-plugins';
const gp = loadPlugins();

// Обработка шрифтов
export default () => {
  return (
    gulp
      .src(path.fonts.src)
      .pipe(
        gp.plumber({
          errorHandler: gp.notify.onError((error) => ({
            title: 'Fonts',
            message: error.message,
          })),
        }),
      )
      .pipe(gp.newer(path.fonts.dest))
      //.pipe(gp.fonter(app.fonter))
      .pipe(gulp.dest(path.fonts.dest))
      .pipe(gp.ttf2woff2())
      .pipe(gulp.dest(path.fonts.dest))
      .pipe(browserSync.stream())
  );
};
