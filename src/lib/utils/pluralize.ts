export const pluralize = (count: number, singular: string, plural: string) =>
  `${count} ${count > 1 ? plural : singular}`
