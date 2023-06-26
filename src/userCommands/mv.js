import { join, sep, normalize } from 'node:path';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { access, unlink } from 'node:fs/promises';
import { stateStorage } from "../storage.js";

const errorMessage = `\nOperation failed`;
const errorTypeMessageSourceFile = `\nThe source file does not exist`;
const errorTypeMessageTargetDirectory = `\nThe target directory does not exist`;
const errorTypeMessageTargetFileExist = `\nA file with the same name already exists in the target directory`;
const successMessage = `\nThe file was successfully moved`;

export const executeMv = async () => {
  const sourceFilePath = stateStorage.currentArgs[0];
  const targetDirectoryPath = stateStorage.currentArgs[1];
  const normalizedSourceFilePath = normalize(sourceFilePath);
  const normalizedTargetDirectoryPath = normalize(targetDirectoryPath);
  const targetFilePath = join(normalizedTargetDirectoryPath, normalizedSourceFilePath.split(sep).pop());

  let sourceFileExists = true;
  let targetDirectoryExists = true;
  let targetFileExists = false;

  try {
    await access(sourceFilePath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      sourceFileExists = false;
    } else {
      console.log(errorMessage);
      console.log(`Error occurred while accessing the source file`);
      return;
    }
  }

  try {
    await access(targetDirectoryPath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      targetDirectoryExists = false;
    } else {
      console.log(errorMessage);
      console.log(`Error occurred while accessing the target directory`);
      return;
    }
  }

  if (!sourceFileExists) {
    console.log(errorMessage);
    console.log(errorTypeMessageSourceFile);
    return;
  }

  if (!targetDirectoryExists) {
    console.log(errorMessage);
    console.log(errorTypeMessageTargetDirectory);
    return;
  }

  try {
    await access(targetFilePath);
    targetFileExists = true;
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.log(errorMessage);
      console.log(errorTypeMessageTargetFileExist);
      return;
    }
  }

  if (targetFileExists) {
    console.log(errorMessage);
    console.log(errorTypeMessageTargetFileExist);
    return;
  }

  try {
    const sourceStream = createReadStream(sourceFilePath);
    const targetStream = createWriteStream(targetFilePath);

    sourceStream.on('error', (error) => {
      console.log(errorMessage);
      console.log(`Error occurred while reading the source file`);
    });

    targetStream.on('error', (error) => {
      console.log(errorMessage);
      console.log(`Error occurred while writing to the target file`);
    });

    targetStream.on('finish', async () => {
      try {
        await unlink(sourceFilePath);
      } catch (error) {
        console.log(errorMessage);
        console.log(`Error occurred while removing the source file`);
      }
    });

    await pipeline(sourceStream, targetStream).catch((error) => {
      console.log(errorMessage);
      console.log(`Error occurred while moving the file`);
    });
  } catch (error) {
    console.log(errorMessage);
    console.log(`Error occurred while moving the file`);
  }
};