import { createBrotliCompress } from 'node:zlib';
import path from 'node:path';
import {lstat} from 'fs/promises';
import { createReadStream, createWriteStream, stat } from 'node:fs';
import { stateStorage } from "../storage.js";
import { checkPathIsExist } from "../utils/checkPathIsExist.js";

const errorMessage = `\nOperation failed`;
const errorTypeMessageSourceFile = `\nThe source file does not exist`;
const errorTypeMessageTargetDirectory = `\nThe target directory does not exist`;
const errorTypeMessageTargetFileExist = `\nA file with the same name already exists in the target directory`;
const successMessage = `\nThe file was successfully compressed`;

export async function executeCompress() {
  const compressedFilePath = stateStorage.currentArgs[0];
  const archivePath = stateStorage.currentArgs[1];

  if (!(await checkPathIsExist(compressedFilePath))) {
    console.log(errorMessage);
    console.log(errorTypeMessageSourceFile);
    return;
  }

  const targetDirectory = archivePath.substring(0, archivePath.lastIndexOf('/'));

  if (!(await checkPathIsExist(targetDirectory))) {
    console.log(errorMessage);
    console.log(errorTypeMessageTargetDirectory);
    return;
  }

  const archiveFilePath = await getArchiveFilePath(archivePath);

  if (await checkPathIsExist(archiveFilePath)) {
    console.log(errorMessage);
    console.log(errorTypeMessageTargetFileExist);
    return;
  }

  const readStream = createReadStream(compressedFilePath);
  const writeStream = createWriteStream(archiveFilePath);
  const brotliStream = createBrotliCompress();

  readStream.pipe(brotliStream).pipe(writeStream);
  await new Promise((resolve) => {
    writeStream.on('finish', resolve);
  });

  console.log(successMessage);
}


async function getArchiveFilePath(archivePath) {
  const isDirectory = await isDirectoryPath(archivePath);
  const hasExtension = path.extname(archivePath).toLowerCase() === '.br';

  if (!isDirectory && !hasExtension) {
    return `${archivePath}.br`;
  }

  if (isDirectory) {
    return path.join(archivePath, 'archive.br');
  }

  return archivePath;
}

async function isDirectoryPath(filePath) {
  try {
    const stats = await lstat(filePath);
    return stats.isDirectory();
  } catch (error) {

    return false;
  }
}