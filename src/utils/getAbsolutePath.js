import { join } from 'node:path';
import { sep } from 'node:path';
import { stateStorage } from "../storage.js";
import {fixEnteredPathsEnd} from "./fixEnteredPathsEnd.js";
import {checkIsRelativePath} from "./checkIsRelativePath.js";

export const getAbsolutePath = () => {
  const path = stateStorage.currentArgs.join('');
  const currentPath = stateStorage.currentUserPath.toString();
  //if the user has put an extra slash at the end of the line
  const fixedPath = fixEnteredPathsEnd(path, sep);
  const isRelativePath = checkIsRelativePath(fixedPath);
  const absolutePath = isRelativePath? join(currentPath.toString(), fixedPath) : fixedPath;
  return absolutePath;
}