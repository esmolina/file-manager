import { join } from 'node:path';
import { access, stat } from 'node:fs/promises';
import { sep } from 'node:path';
import { stateStorage } from "../storage.js";
import { fixEnteredPathsEnd } from "../utils/fixEnteredPathsEnd.js";
import { checkIsRelativePath } from "../utils/checkIsRelativePath.js";

const errorMessage = '\nOperation failed';
const errorTypeMessage = 'There is no such folder';

export async function executeCd () {
  const path = stateStorage.currentArgs.join('');
  const currentPath = stateStorage.currentUserPath.toString();
  //if the user has put an extra slash at the end of the line
  const fixedPath = fixEnteredPathsEnd(path, sep);
  const isRelativePath = checkIsRelativePath(fixedPath);
  const absolutePath = isRelativePath? join(currentPath.toString(), fixedPath) : fixedPath;

  try {
    const pathStat = await stat(absolutePath);
    if (pathStat.isDirectory()) {
      stateStorage.currentUserPath = absolutePath;
    } else {
      console.log(errorMessage);
      console.log(errorTypeMessage);
    }
  } catch (err) {
    console.log(errorMessage);
    console.log(errorTypeMessage);
  }
}