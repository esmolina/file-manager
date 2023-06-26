import { stat, readFile } from 'node:fs/promises';
import {getAbsolutePath} from "../utils/getAbsolutePath.js";
import {readline} from "../startApp.js";
import {stateStorage} from "../storage.js";

const errorMessage = `\nOperation failed`;
const errorTypeMessage = 'There is no such file';

export async function executeCat () {
  const path = stateStorage.currentArgs.join('');
  const absolutePath = getAbsolutePath(path);
  try {
    const pathStat = await stat(absolutePath);
    if (pathStat.isFile()) {
      const fileContent = await readFile(absolutePath);
      readline.setPrompt(fileContent);
      readline.prompt();
    } else {
      console.log(errorMessage);
      console.log(errorTypeMessage);
    }
  } catch (err) {
    console.log(errorMessage);
    console.log(errorTypeMessage);
  }
}