import { argv } from 'node:process';

export const getArgs = () => {
  const args = [];
  for (let i = 2; i <= argv.length - 1; i=i+1) {
    const arg = (`${argv[i]}`);
    args.push(arg);
  }
  return args;
};