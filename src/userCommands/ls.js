import { readdir } from 'fs/promises';
import { stateStorage } from "../storage.js";

const folderEmptyMessage = `\nThe folder is empty`;

export async function executeLs () {
  const workFolderPath = stateStorage.currentUserPath;
  const folderContent = await readdir(workFolderPath, { withFileTypes: true });
  const unSortedList = folderContent.map((direntObject) => ({
    Name: direntObject.name,
    Type: direntObject.isFile() ? 'file' : 'directory'
  }));

  if (folderContent.length === 0) {
    console.log(folderEmptyMessage);
    return;
  }

  const sortedList = unSortedList.sort((a, b) => {
    if (a.Type === b.Type) {
      return a.Name.localeCompare(b.Name);
    } else {
      return a.Type === 'directory' ? -1 : 1;
    }
  });

  console.table(sortedList);
}