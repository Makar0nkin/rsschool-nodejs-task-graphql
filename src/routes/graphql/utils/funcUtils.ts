import { iID } from "./interfaces.js";

export function orderDataByField<T extends iID>(
  list: T[],
  ids: string[],
  field: string,
): T[] {
  const fieldMapping: Record<string, T> = list.reduce(
    (acc, item) => ({ ...acc, [item[field]]: item }),
    {},
  );
  return ids.map((id) => fieldMapping[id])
}
