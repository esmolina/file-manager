import { stat } from 'node:fs/promises';
import { stateStorage } from "../storage.js";
import {getAbsolutePath} from "../utils/getAbsolutePath.js";

const errorMessage = '\nOperation failed';
const errorTypeMessage = 'There is no such folder';

export async function executeCd () {
  const absolutePath = getAbsolutePath();
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