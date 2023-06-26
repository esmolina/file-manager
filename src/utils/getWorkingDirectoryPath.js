import { cwd } from 'node:process';

export const getWorkingDirectoryPath = () => {
  const currentPath = cwd();
  return currentPath;
}