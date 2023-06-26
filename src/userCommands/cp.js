import { join, sep, normalize } from 'node:path';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { access, stat } from 'node:fs/promises';
import { stateStorage } from "../storage.js";

const errorMessage = `\nOperation failed`;
const errorTypeMessageSourceFile = `\nThe source file does not exist`;
const errorTypeMessageTargetDirectory = `\nThe target directory does not exist`;
const errorTypeMessageTargetFileExist = `\nThe file with the same name already exists in the target directory`;
const successMessage = `\nThe file was successfully copied`;


export async function executeCp() {
  const sourceFilePath = stateStorage.currentArgs[0];
  const targetDirectoryPath = stateStorage.currentArgs[1];
  const normalizedSourceFilePath = normalize(sourceFilePath);
  const normalizedTargetDirectoryPath = normalize(targetDirectoryPath);
  const targetFilePath = join(normalizedTargetDirectoryPath, normalizedSourceFilePath.split(sep).pop());

  let sourceFileExists = true;
  let targetDirectoryExists = true;
  let targetFileExists = false;

  try {
    await access(normalizedSourceFilePath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      sourceFileExists = false;
    } else {
      console.log(errorMessage);
      console.log(`Error occurred while accessing the source file: ${error.message}`);
      return;
    }
  }

  try {
    await access(normalizedTargetDirectoryPath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      targetDirectoryExists = false;
    } else {
      console.log(errorMessage);
      console.log(`Error occurred while accessing the target directory: ${error.message}`);
      return;
    }
  }

  if (!sourceFileExists) {
    console.log(errorMessage);
    console.log(`${errorTypeMessageSourceFile}`);
    return;
  }

  if (!targetDirectoryExists) {
    console.log(errorMessage);
    console.log(`${errorTypeMessageTargetDirectory}`);
    return;
  }

  try {
    await stat(targetFilePath);
    targetFileExists = true;
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.log(errorMessage);
      console.log(`${errorTypeMessageTargetFileExist}`);
      return;
    }
  }

  if (targetFileExists) {
    console.log(errorMessage);
    console.log(`${errorTypeMessageTargetFileExist}`);
    return;
  }

  const sourceStream = createReadStream(normalizedSourceFilePath);
  const targetStream = createWriteStream(targetFilePath);

  sourceStream.on('error', (error) => {
    console.log(errorMessage);
    console.log(`Error occurred while reading the source file`);
  });

  targetStream.on('error', (error) => {
    console.log(errorMessage);
    console.log(`Error occurred while writing to the target file`);
  });

  try {
    await pipeline(sourceStream, targetStream);
    console.log(successMessage);
  } catch (error) {
    console.log(errorMessage);
    console.log(`Error occurred during file copying`);
  }
}