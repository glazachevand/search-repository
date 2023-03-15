import gulp from "gulp";

// пути
import path from "../config/path.js";

// удаление директории
export default () => {
  return gulp.src(path.resources.src).pipe(gulp.dest(path.resources.dest));
};
