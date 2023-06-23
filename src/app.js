import { getRelativeDirname } from "./utils/getDirname.js";
import { getUserName} from "./utils/getUserName.js";
import {getArgs} from "./utils/getArgs.js";

const __dirname = getRelativeDirname(import.meta.url);
const enteredArgs = getArgs();

const startApp = () => {
  console.log(getUserName(enteredArgs));
}

startApp();