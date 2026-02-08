// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cleanObject = <T extends Record<string, any>>(
  obj: T,
): Partial<T> => {
  const cleaned = {} as Partial<T>;

  Object.entries(obj).forEach(([key, value]) => {
    if (value === null || value === undefined) return;
    if (typeof value === "string" && value.trim() === "") return;
    if (value instanceof Date && isNaN(value.getTime())) return;

    cleaned[key as keyof T] = value;
  });

  return cleaned;
};
