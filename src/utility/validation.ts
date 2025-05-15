export function isValidLength(title: string) {
  const result = title.length <= 64 && title.length >= 2;
  return result;
}
