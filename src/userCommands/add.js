import { writeFile } from 'fs/promises';
import path from 'node:path';
import { stateStorage } from "../storage.js";

const errorMessage = '\nOperation failed';
const errorTypeMessage = 'Such a file already exists';

export async function executeAdd (){
  const currentDirectory = stateStorage.currentUserPath;
  const newFileName = stateStorage.currentArgs.join('');
  const newFiePath = path.join(currentDirectory, newFileName);
  try {
    await writeFile(newFiePath, '', {flag: "wx"});
    console.log(`\nFile ${newFileName} was created in ${currentDirectory}`);
  } catch {
    console.log(errorMessage);
    console.log(errorTypeMessage);
  }
}