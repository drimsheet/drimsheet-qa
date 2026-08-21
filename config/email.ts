export function getEmail(alias: string[]) {
  if (!alias?.length) return "qa.automation@drimsheet.com";

  const composedAlias = alias.map((v) => v.toLocaleLowerCase()).join("+");

  return `qa.automation+${composedAlias}@drimsheet.com`;
}
