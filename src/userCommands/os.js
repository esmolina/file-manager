import {stateStorage} from "../storage.js";

export async function executeOs () {
  const arg = stateStorage.currentArgs[0];
  console.log(arg);
  switch (arg) {
    case '--EOL':
      break;
    case '--cpus':
      break;
    case '--homedir':
      break;
    case '--username':
      break;
    case '--architecture':
      break;
    default:
      console.log(invalidMessage);
      break;
  }
}