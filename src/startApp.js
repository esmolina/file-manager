import { stdin, stdout } from 'node:process';
import { createInterface } from 'node:readline/promises';
import { getRelativeDirname } from "./utils/getDirname.js";
import { getWorkingDirectoryPath } from "./utils/getWorkingDirectoryPath.js";
import { sayHi, sayGoodbye } from "./utils/sayHiGoodbye.js";
import { executeUsersCommand } from "./utils/executeUsersCommand.js";
import { stateStorage} from "./storage.js";

export const readline = createInterface({
  input: stdin,
  output: stdout
})

// const inputChannel = stdin;
const __dirname = getRelativeDirname(import.meta.url);
const currentDirectory = getWorkingDirectoryPath();

const startApp = () => {
  sayHi();
  readline.on('line', (input) => {
    stateStorage.currentCommand = input;
    executeUsersCommand();
  });

  readline.on('SIGINT', () => {
    sayGoodbye();
  });

  //ToDo
  // outputChannel.write(`You are currently in ${homedir}\n`);
  // inputChannel.on('data', enteredSymbols => {
  //   const userCommand = (`${enteredSymbols}`).trim().toLowerCase();
  //   // Exit by .exit
  //   if (userCommand === '.exit') {
  //     outputChannel.write(`\nThank you for using File Manager, ${userName}, goodbye!\n`);
  //     process.exit(0);
  //   }
  // })
  //
  // // Exit by CTRL+C
  // process.on('SIGINT', () => {
  //   outputChannel.write(`\nThank you for using File Manager, ${userName}, goodbye!\n`);
  //   process.exit(0);
  // });
}

startApp();