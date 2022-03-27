export const getCurrentLocation = (root: string): string => {
  return process.cwd().replace(root + '/', '');
}
