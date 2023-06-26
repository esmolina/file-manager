export const getUserName = (args) => {
  const substringLength = ('--username=').length;
  if (args.length === 0) return 'Incognito';
  const parsedArg = args[0];
  const isUserName = parsedArg.startsWith('--username=');
  if (args.length === 1 && isUserName) {
    return parsedArg.slice(substringLength);
  } else {
    return 'Incognito';
  }
}