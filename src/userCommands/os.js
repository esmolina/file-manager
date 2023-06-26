import os from 'node:os';
import { stateStorage } from "../storage.js";

const invalidMessage = 'Invalid command.';

export async function executeOs () {
  const arg = stateStorage.currentArgs[0];
  switch (arg) {
    case '--EOL':
      const endOfLine = os.platform() === 'win32' ? '\\r\\n' : '\\n';
      console.log(`Default System End-Of-Line: ${endOfLine}`);
      break;
    case '--cpus':
      const cpus = os.cpus();
      console.log(`Host machine CPUs info:`);
      cpus.forEach((cpu, index) => {
        console.log(`CPU ${index + 1}:`, `\n model: ${cpu.model}`,`\n clock rate: ${cpu.speed / 1000} GHz`);
      });
      console.log(`Overall amount of CPUs: ${cpus.length}`);
      break;
    case '--homedir':
      console.log(`Home directory: ${os.homedir()}`);
      break;
    case '--username':
      console.log(`Current system user name: ${os.userInfo().username}`);
      break;
    case '--architecture':
      console.log(`CPU architecture: ${os.arch()}`);
      break;
    default:
      console.log(invalidMessage);
      break;
  }
}