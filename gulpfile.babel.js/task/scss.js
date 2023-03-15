import gulp from "gulp";
import browserSync from "browser-sync";

// пути
import path from "../config/path.js";
// настройки плагинов
import app from "../config/app.js";

// Плагины
import loadPlugins from "gulp-load-plugins";
const gp = loadPlugins();

// Обработка scss
export default () => {
  return gulp
    .src(path.scss.src, { sourcemaps: app.isDev })
    .pipe(
      gp.plumber({
        errorHandler: gp.notify.onError((error) => ({
          title: "SCSS",
          message: error.message,
        })),
      })
    )
    .pipe(gp.sassGlob())
    .pipe(gp.sass(require("sass"))())
    .pipe(gp.webpCss())
    .pipe(gp.autoprefixer())
    .pipe(gp.shorthand())
    .pipe(gp.groupCssMediaQueries())
    .pipe(gp.size({ title: "До сжатия main.css" }))
    .pipe(gulp.dest(path.scss.dest, { sourcemaps: app.isDev }))
    .pipe(gp.rename({ suffix: ".min" }))
    .pipe(gp.csso())
    .pipe(gp.size({ title: "После сжатия main.min.css" }))
    .pipe(gulp.dest(path.scss.dest, { sourcemaps: app.isDev }))
    .pipe(browserSync.stream());
};
