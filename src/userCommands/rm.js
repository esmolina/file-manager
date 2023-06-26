import { access, unlink } from 'node:fs/promises';
import { stateStorage } from "../storage.js";
import { getAbsolutePath } from "../utils/getAbsolutePath.js";

const errorMessage = `\nOperation failed`;
const errorTypeMessageSourceFile = `\nThe deleted file does not exist`;
const errorWhileDeleting = `\nError occurred while deleting the file`;
const successMessage = `\nThe file was successfully deleted`;

export async function executeRm() {
  const deletedFilePath = stateStorage.currentArgs[0];
  const absolutePath = getAbsolutePath(deletedFilePath);

  try {
    await access(absolutePath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(errorMessage);
      console.log(errorTypeMessageSourceFile);
      return;
    } else {
      console.log(errorMessage);
      console.log(errorWhileDeleting);
      return;
    }
  }

  try {
    await unlink(absolutePath);
    console.log(successMessage);
  } catch (error) {
    console.log(errorMessage);
    console.log(errorWhileDeleting);
  }
}