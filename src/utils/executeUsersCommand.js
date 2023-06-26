import { stateStorage } from "../storage.js";
import {sayGoodbye} from "./sayHiGoodbye.js";

const invalidMessage = 'Invalid input';

export const executeUsersCommand = () => {
  const userCommand = stateStorage.currentCommand;
  const args = stateStorage.currentArgs;
  const haveArgs = args.length ? true : false;

  switch (userCommand) {
    case '.exit':
      if (!haveArgs) { sayGoodbye() }
      else { console.log(invalidMessage)}
      break;

    default:
      console.log(invalidMessage);
      break;
  }
}