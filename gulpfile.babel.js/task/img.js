import gulp from "gulp";
import browserSync from "browser-sync";

// пути
import path from "../config/path.js";
// настройки плагинов
import app from "../config/app.js";

// Плагины
import loadPlugins from "gulp-load-plugins";
const gp = loadPlugins();

// Обработка картинок
export default () => {
  return gulp
    .src(path.img.src)
    .pipe(
      gp.plumber({
        errorHandler: gp.notify.onError((error) => ({
          title: "Image",
          message: error.message,
        })),
      })
    )
    .pipe(gp.newer(path.img.dest))
    .pipe(gp.webp())
    .pipe(gulp.dest(path.img.dest))
    .pipe(gulp.src(path.img.src))
    .pipe(gp.newer(path.img.dest))
    .pipe(gp.if(app.isProd, gp.imagemin(app.imagemin)))
    .pipe(gulp.dest(path.img.dest))
    .pipe(browserSync.stream());
};
