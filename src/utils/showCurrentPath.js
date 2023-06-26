import { stateStorage } from "../storage.js";

export async function showCurrentPath () {
  const currentPath = stateStorage.currentUserPath;
  console.log(`You are currently in ${currentPath}`);
}