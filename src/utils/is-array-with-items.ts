export const isArrayWithItems = <T>(array?: T[] | unknown): array is T[] => Array.isArray(array) && array.length > 0;
