// удаление директории
import del from "del";
import path from "../config/path.js";

// удаление директории
export default () => {
  return del(path.root);
};
