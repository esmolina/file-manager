import { stdin, stdout } from 'node:process'
import { getRelativeDirname } from "./utils/getDirname.js";
import { getUserName} from "./utils/getUserName.js";
import {getArgs} from "./utils/getArgs.js";

const inputChannel = stdin;
const outputChannel = stdout;
const __dirname = getRelativeDirname(import.meta.url);
const enteredArgs = getArgs();
const userName = getUserName(enteredArgs);

const startApp = () => {
  outputChannel.write(`Welcome to the File Manager, ${userName}!\n\n`);
  inputChannel.on('data', enteredSymbols => {
    const userCommand = (`${enteredSymbols}`).trim().toLowerCase();
    // Exit by .exit
    if (userCommand === '.exit') {
      outputChannel.write(`\nThank you for using File Manager, ${userName}, goodbye!\n`);
      process.exit(0);
    }
  })

  // Exit by CTRL+C
  process.on('SIGINT', () => {
    outputChannel.write(`\nThank you for using File Manager, ${userName}, goodbye!\n`);
    process.exit(0);
  });
}

startApp();