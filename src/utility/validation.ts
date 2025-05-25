export function hasValidTodoTitle(title: string) {
  return title.trim().length <= 64 && title.trim().length >= 2;
}
