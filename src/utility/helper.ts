export const objectIsEmpty = <T extends object>(obj: T): boolean => {
  return Object.keys(obj).length === 0;
};
