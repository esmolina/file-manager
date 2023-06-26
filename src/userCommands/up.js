import { platform } from 'node:process';
import { sep } from 'node:path';
import { stateStorage } from "../storage.js";

const userPlatform = platform;

export const executeUp = () => {
  const absolutePath = stateStorage.currentUserPath;
  const relativePathsArray = absolutePath.split(sep);

  if (userPlatform !== "win32") {
    const posixPathsArray = relativePathsArray.slice(1);
    if (posixPathsArray.length === 1) {
      stateStorage.currentUserPath = sep;
      return
    }
  }
    relativePathsArray.pop();
    stateStorage.currentUserPath = relativePathsArray.join(sep);
}