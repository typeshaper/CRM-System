export const objectIsEmpty = <T extends object>(obj: T): boolean => {
  return Object.keys(obj).length === 0;
};

export function getObjectDiff<T extends object>(
  originalObj: T,
  updatedObj: T
): Partial<T> {
  const changedKeys: Partial<T> = {};
  for (const key in originalObj) {
    if (originalObj[key] !== updatedObj[key]) {
      changedKeys[key] = updatedObj[key];
    }
  }
  return changedKeys;
}

export const debounce = <F extends (...args: Parameters<F>) => ReturnType<F>>(
  func: F,
  delay: number
) => {
  let timeout: number;

  return function (...args: Parameters<F>) {
    clearInterval(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
