import { stdin, stdout } from 'node:process';
import { createInterface } from 'node:readline/promises';
import { getRelativeDirname } from "./utils/getDirname.js";
import { getWorkingDirectoryPath } from "./utils/getWorkingDirectoryPath.js";
import { sayHi, sayGoodbye } from "./utils/sayHiGoodbye.js";
import { executeUsersCommand } from "./utils/executeUsersCommand.js";
import { parseReadlineInput } from "./utils/parseReadlineInput.js";
import { showCurrentPath } from "./utils/showCurrentPath.js";
import {stateStorage} from "./storage.js";

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
    parseReadlineInput(input);
    executeUsersCommand();
    if (stateStorage.currentCommand !== '.exit') { showCurrentPath()};
  });

  readline.on('SIGINT', () => {
    sayGoodbye();
  });
}

startApp();