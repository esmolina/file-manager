import { sep } from 'node:path';
import { stat, rename } from 'fs/promises';
import { stateStorage } from "../storage.js";
import {getAbsolutePath} from "../utils/getAbsolutePath.js";

const errorMessage = `\nOperation failed`;
const errorTypeMessageOldEnoent = `\nThe source file does not exist`;
const errorTypeMessageNewExist = `\nThe file with the suggested name already exists in this folder`;

export async function executeRn(){
  const oldFilePathReceived = stateStorage.currentArgs[0];
  const oldFilePath = getAbsolutePath(oldFilePathReceived);
  const oldFilePathParts = oldFilePath.split(sep);
  const newFileName = stateStorage.currentArgs[1];
  oldFilePathParts.pop();
  oldFilePathParts.push(newFileName);
  const newFilePath = oldFilePathParts.join(sep);

  try {
    await stat(oldFilePath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(errorMessage);
      console.log(errorTypeMessageOldEnoent);
      return;
    }
  }

  try {
    await stat(newFilePath);
    console.log(errorMessage);
    console.log(errorTypeMessageNewExist);
    return;
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.log(errorMessage);
      console.log(errorTypeMessageNewExist);
      return;
    }
  }

  try {
    await rename(oldFilePath, newFilePath);
    console.log(`The file at the address ${oldFilePath} was successfully renamed to ${newFileName}`);
  } catch (error) {
    console.log(errorMessage);
    console.log('Error occurred while renaming the file');
  }
}