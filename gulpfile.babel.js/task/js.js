// webpack
import webpack from "webpack-stream";
import gulp from "gulp";
import browserSync from "browser-sync";

// пути
import path from "../config/path.js";
// настройки плагинов
import app from "../config/app.js";

// Плагины
import loadPlugins from "gulp-load-plugins";
const gp = loadPlugins();

// Обработка js
export default () => {
  return gulp
    .src(path.js.src, { sourcemaps: app.isDev })
    .pipe(
      gp.plumber({
        errorHandler: gp.notify.onError((error) => ({
          title: "JS",
          message: error.message,
        })),
      })
    )
    .pipe(gp.babel())
    .pipe(webpack(app.webpack))
    .pipe(gulp.dest(path.js.dest, { sourcemaps: app.isDev }))
    .pipe(browserSync.stream());
};
