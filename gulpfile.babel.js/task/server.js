import browserSync from "browser-sync";
import path from "../config/path.js";

// Сервер
export default () => {
  browserSync.init({
    server: {
      baseDir: path.root,
    },
    notify: true,
    port: 3000,
  });
};
