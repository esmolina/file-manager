import { stdout } from 'node:process'
import { getRelativeDirname } from "./utils/getDirname.js";
import { getUserName} from "./utils/getUserName.js";
import {getArgs} from "./utils/getArgs.js";

const outputChannel = stdout;
const __dirname = getRelativeDirname(import.meta.url);
const enteredArgs = getArgs();
const userName = getUserName(enteredArgs);

const startApp = () => {
  outputChannel.write(`Welcome to the File Manager, ${userName}!\n`);
}

startApp();