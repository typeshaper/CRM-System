export function hasValidTodoTitle(title: string) {
  return title.length <= 64 && title.length >= 2;
}
