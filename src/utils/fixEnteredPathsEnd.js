export const fixEnteredPathsEnd = (cdPath, systemSep) => {
  if (cdPath.endsWith(systemSep)) {
    return cdPath.slice(0, -1);
  }
  return cdPath;
}