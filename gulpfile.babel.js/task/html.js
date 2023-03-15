import gulp from "gulp";
import browserSync from "browser-sync";

// пути
import path from "../config/path.js";
// настройки плагинов
import app from "../config/app.js";

// Плагины
import loadPlugins from "gulp-load-plugins";
const gp = loadPlugins();

// Обработка html
export default () => {
  return gulp
    .src(path.html.src)
    .pipe(
      gp.plumber({
        errorHandler: gp.notify.onError((error) => ({
          title: "HTML",
          message: error.message,
        })),
      })
    )
    .pipe(gp.fileInclude())
    .pipe(gp.webpHtml())
    .pipe(gp.size({ title: "До сжатия" }))
    .pipe(gp.htmlmin(app.htmlmin))
    .pipe(gp.htmlPrettify(app.htmlPrettify))
    .pipe(gp.size({ title: "После сжатия" }))
    .pipe(gulp.dest(path.html.dest))
    .pipe(browserSync.stream());
};
