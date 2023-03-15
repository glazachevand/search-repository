import gulp from "gulp";

// Конфигурация
// пути
import path from "./config/path.js";
// настройки плагинов
import app from "./config/app.js";

// Задачи
import clear from "./task/clear.js";
import html from "./task/html.js";
import scss from "./task/scss.js";
import js from "./task/js.js";
import img from "./task/img.js";
import fonts from "./task/fonts.js";
import resources from "./task/resources.js";
import server from "./task/server.js";

// Наблюдение: что наблюдаем, какие задачи запускаем
const watcher = () => {
  gulp.watch(path.html.watch, html);
  gulp.watch(path.scss.watch, scss);
  gulp.watch(path.js.watch, js);
  gulp.watch(path.img.watch, img);
  gulp.watch(path.fonts.watch, fonts);
  gulp.watch(path.resources.watch, resources);
};

// режим production
const build = gulp.series(
  clear,
  gulp.parallel(html, scss, js, img, fonts, resources)
);

// режим разработки
const dev = gulp.series(build, gulp.parallel(watcher, server));

// Задачи
export { html, scss, js, img, fonts, resources };

// Сборка по умоланию - запускается командой gulp с аргументом --production или без него
export default app.isProd ? build : dev;
