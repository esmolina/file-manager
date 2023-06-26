import { stdin, stdout } from 'node:process';
import { createInterface } from 'node:readline/promises';
import { sayHi, sayGoodbye } from "./utils/sayHiGoodbye.js";
import { executeUsersCommand } from "./utils/executeUsersCommand.js";
import { parseReadlineInput } from "./utils/parseReadlineInput.js";
import { showCurrentPath } from "./utils/showCurrentPath.js";
import {stateStorage} from "./storage.js";

export const readline = createInterface({
  input: stdin,
  output: stdout
})

async function startApp () {
  sayHi();
  readline.on('line', async (input) => {
    parseReadlineInput(input);
    await executeUsersCommand();
    if (stateStorage.currentCommand !== '.exit') {
      await showCurrentPath();
      readline.setPrompt('Enter a command: ');
      readline.prompt();
    };
  });

  readline.setPrompt('Enter a command: ');
  readline.prompt();

  readline.on('SIGINT', () => {
    sayGoodbye();
  });
}

await startApp();