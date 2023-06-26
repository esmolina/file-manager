import { access, readFile } from 'node:fs/promises';

export const checkPathIsExist = async (sourcePath) => {
  try {
    await access(sourcePath);
  } catch (error) {
    return error.code !== 'ENOENT';
  }
}