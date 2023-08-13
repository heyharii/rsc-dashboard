export function classNames(...classes: String[]) {
  return classes.filter(Boolean).join(' ')
}

export const paginateItems = <T>(items: T[], limit: number, skip: number): T[] => {
  return items.slice(skip, skip + limit);
};
