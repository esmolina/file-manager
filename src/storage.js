import { homedir } from 'node:os';

export const stateStorage = {
  currentCommand: '',
  currentUserPath: homedir,
}