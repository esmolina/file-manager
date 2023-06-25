import { stateStorage } from "../storage.js";

export const parseReadlineInput = (string) => {
  const stringPartsArray = string.match(/(['"])(?:(?!\1).)*\1|\S+/g);

  const command = stringPartsArray.shift();
  const args = stringPartsArray.map((part) => part.replace(/['"]/g, ''));

  stateStorage.currentCommand = command;
  stateStorage.currentArgs = args;
}