import { homedir } from 'node:os';

export const stateStorage = {
  currentCommand: '',
  currentArgs: [],
  currentUserPath: homedir,
}