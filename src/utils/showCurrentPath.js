import { stateStorage } from "../storage.js";

export const showCurrentPath = () => {
  const currentPath = stateStorage.currentUserPath;
  console.log(`You are currently in ${currentPath}`);
}