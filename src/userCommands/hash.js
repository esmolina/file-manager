import { access, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { stateStorage } from "../storage.js";

const errorMessage = `\nOperation failed`;
const errorTypeMessageSourceFile = `\nThe source file does not exist`;
const errorCantReadFile = `\nError occurred while accessing the file`;
const errorBadCalculateHash = `\nError occurred while calculating the file hash`;

export async function executeHash() {
  const filePath = stateStorage.currentArgs[0];

  try {
    await access(filePath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(errorMessage);
      console.log(errorTypeMessageSourceFile);
      return;
    } else {
      console.log(errorMessage);
      console.log(errorCantReadFile);
      return;
    }
  }

  try {
    const fileContents = await readFile(filePath);
    const hash = createHash('sha256').update(fileContents).digest('hex');
    console.log(`File hash is: ${hash}`);
  } catch (error) {
    console.log(errorMessage);
    console.log(errorBadCalculateHash);
  }
}