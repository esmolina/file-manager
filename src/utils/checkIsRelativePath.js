import {isAbsolute, resolve, sep } from 'node:path';

export const checkIsRelativePath = (path) => {
  const resolvedPath = resolve(path);
  const isPathTypeSlash = /^(?:\.{0,2}[\\/])+[^\\/]*$/.test(resolvedPath);
  const isPathTypeFolderName = /^[^\\/]*$/.test(resolvedPath);
  const isAbsoluteWindows = isAbsolute(path) && resolvedPath.indexOf(':') !== -1;
  const isAbsolutePosix = isAbsolute(path) && resolvedPath.startsWith(sep) && !isPathTypeSlash && !isPathTypeFolderName;
  const isRelative = !isAbsoluteWindows && !isAbsolutePosix && !isPathTypeSlash && !isPathTypeFolderName;

  return isRelative;
}
