import { stateStorage } from "../storage.js";
import {executeExit} from "../userCommands/exit.js";
import {executeUp} from "../userCommands/up.js";
import {executeCd} from "../userCommands/cd.js";

const invalidMessage = 'Invalid input';

export async function executeUsersCommand (){
  const userCommand = stateStorage.currentCommand;
  const args = stateStorage.currentArgs;
  const haveArgs = !!args.length;
  const isNoMoreOneArg = args.length === 1;

  switch (userCommand) {
    case '.exit':
      if (!haveArgs) { executeExit() }
      else { console.log(invalidMessage)}
      break;
    case 'up':
      if (!haveArgs) { executeUp() }
      else { console.log(invalidMessage)}
      break;
    case 'cd':
      if (haveArgs && isNoMoreOneArg) { await executeCd() }
      else { console.log(invalidMessage)}
      break;
    default:
      console.log(invalidMessage);
      break;
  }
}