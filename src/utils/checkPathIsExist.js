import { access } from 'node:fs/promises';

export const checkPathIsExist = async (sourcePath) => {
  try {
    await access(sourcePath);
    return true;
  } catch (error) {
    return false;
  }
};