/**
 * Formats a raw number or string to a string with thousands separators.
 * Example: 1000 -> "1,000"
 */
export function formatThousands(value: number | string | undefined | null): string {
  if (value === undefined || value === null || value === "") return "";
  
  // Convert to string and remove non-numeric except decimal
  const str = value.toString().replace(/[^0-9.]/g, "");
  if (!str) return "";

  const parts = str.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

/**
 * Removes separators from a formatted string to return a raw number.
 * Example: "1,000" -> 1000
 */
export function parseThousands(value: string): number {
  return Number(value.replace(/,/g, ""));
}
