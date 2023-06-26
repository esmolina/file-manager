import { stdout } from 'node:process';
import { readline } from "../startApp.js";
import { getArgs} from "./getArgs.js";
import { getUserName } from "./getUserName.js";
import { showCurrentPath } from "./showCurrentPath.js";

const enteredArgs = getArgs();
const userName = getUserName(enteredArgs);
const outputChannel = stdout;

export const sayHi = () => {
  outputChannel.write(`Welcome to the File Manager, ${userName}!\n\n`);
  showCurrentPath();
}

export const sayGoodbye = () => {
  outputChannel.write(`\nThank you for using File Manager, ${userName}, goodbye!\n`);
  readline.close();
}