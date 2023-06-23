export const getUserName = (args) => {
  const substringLength = ('--username=').length;
  const parsedArg = args[0];
  const isUserName = parsedArg.startsWith('--username=');
  if (args.length === 1 && isUserName) {
    return parsedArg.slice(substringLength);
  } else {
    return 'Incognito';
  }
}