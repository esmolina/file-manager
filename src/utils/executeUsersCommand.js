import { stateStorage } from "../storage.js";
import {executeExit} from "../userCommands/exit.js";
import {executeUp} from "../userCommands/up.js";

const invalidMessage = 'Invalid input';

export const executeUsersCommand = () => {
  const userCommand = stateStorage.currentCommand;
  const args = stateStorage.currentArgs;
  const haveArgs = args.length ? true : false;

  switch (userCommand) {
    case '.exit':
      if (!haveArgs) { executeExit() }
      else { console.log(invalidMessage)}
      break;
    case 'up':
      if (!haveArgs) { executeUp() }
      else { console.log(invalidMessage)}
      break;
    default:
      console.log(invalidMessage);
      break;
  }
}