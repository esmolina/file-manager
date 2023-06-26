import { stateStorage } from "../storage.js";
import {executeExit} from "../userCommands/exit.js";
import {executeUp} from "../userCommands/up.js";
import {executeCd} from "../userCommands/cd.js";
import {executeLs} from "../userCommands/ls.js";
import {executeCat} from "../userCommands/cat.js";
import {executeAdd} from "../userCommands/add.js";
import {executeRn} from "../userCommands/rn.js";
import {executeCp} from "../userCommands/cp.js";
import {executeMv} from "../userCommands/mv.js";
import {executeRm} from "../userCommands/rm.js";
import {executeOs} from "../userCommands/os.js";

const invalidMessage = 'Invalid input';

export async function executeUsersCommand (){
  const userCommand = stateStorage.currentCommand;
  const args = stateStorage.currentArgs;
  const haveArgs = !!args.length;
  const isNoMoreOneArg = args.length === 1;
  const isTwoArgs = args.length === 2;

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
    case 'ls':
      if (!haveArgs) { await executeLs() }
      else { console.log(invalidMessage)}
      break;
    case 'cat':
      if (haveArgs && isNoMoreOneArg) { await executeCat() }
      else { console.log(invalidMessage)}
      break;
    case 'add':
      if (haveArgs && isNoMoreOneArg) { await executeAdd() }
      else { console.log(invalidMessage)}
      break;
    case 'rn':
      if (haveArgs && isTwoArgs) {
        await executeRn();
      }
      else { console.log(invalidMessage)}
      break;
    case 'cp':
      if (haveArgs && isTwoArgs) {
        await executeCp();
      }
      else { console.log(invalidMessage)}
      break;
    case 'mv':
      if (haveArgs && isTwoArgs) {
        await executeMv();
      }
      else { console.log(invalidMessage)}
      break;
    case 'rm':
      if (haveArgs && isNoMoreOneArg) {
        await executeRm();
      }
      else { console.log(invalidMessage)}
      break;
    case 'os':
      if (haveArgs && isNoMoreOneArg) {
        await executeOs();
      }
      else { console.log(invalidMessage)}
      break;
    default:
      console.log(invalidMessage);
      break;
  }
}