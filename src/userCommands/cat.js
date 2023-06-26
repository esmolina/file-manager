import { stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { stdout } from 'node:process'
import {getAbsolutePath} from "../utils/getAbsolutePath.js";
import {stateStorage} from "../storage.js";

const outputChannel = stdout;
const errorMessage = `\nOperation failed`;
const errorTypeMessage = 'There is no such file';
const supportedEncodings = ['utf8', 'ascii', 'utf16le', 'ucs2', 'base64', 'latin1', 'binary', 'hex'];

export async function executeCat() {
  const filePath = stateStorage.currentArgs.join('');
  const absolutePath = getAbsolutePath(filePath);

  try {
    const fileStat = await stat(absolutePath);

    if (fileStat.isFile()) {
      const readStream = createReadStream(absolutePath);
      let fileData = '';

      readStream.on('data', (chunk) => {
        fileData += chunk;
      });

      readStream.on('error', (error) => {
        outputChannel.write(errorMessage);
      });

      await new Promise((resolve) => {
        readStream.on('close', () => {
          resolve();
        });
      });

      const detectedEncoding = getEncoding(fileData);
      if (detectedEncoding) {
        outputChannel.write(`Detected encoding: ${detectedEncoding}\n`);
      }

      outputChannel.write(`${fileData}\n`);
    } else {
      console.log(errorMessage);
      console.log(errorTypeMessage);
    }
  } catch (error) {
    console.log(errorMessage);
    console.log(errorTypeMessage);
  }
}

function getEncoding(fileData) {
  for (let encoding of supportedEncodings) {
    try {
      fileData.toString(encoding);
      return encoding;
    } catch (error) {}
  }
  return null;
}