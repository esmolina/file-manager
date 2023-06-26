import { stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { stdout } from 'node:process'
import {getAbsolutePath} from "../utils/getAbsolutePath.js";
import {stateStorage} from "../storage.js";

const outputChannel = stdout;
const errorMessage = `\nOperation failed`;
const errorTypeMessage = 'There is no such file';

export async function executeCat() {
  const filePath = stateStorage.currentArgs.join('');
  const absolutePath = getAbsolutePath(filePath);

  try {
    const fileStat = await stat(absolutePath);

    if (fileStat.isFile()) {
      const readStream = createReadStream(absolutePath);

      readStream.on('data', (fileContent) => {
        outputChannel.write(`${fileContent}\n`);
      });

      readStream.on('error', (error) => {
        outputChannel.write(errorMessage);
      });

      await new Promise((resolve) => {
        readStream.on('close', () => {
          resolve();
        });
      });
    } else {
      console.log(errorMessage);
      console.log(errorTypeMessage);
    }
  } catch (error) {
    console.log(errorMessage);
    console.log(errorTypeMessage);
  }
}