export function generateUniqueString(): string {
    const timestamp = Date.now().toString(36); // base-36 timestamp
    const randomPart = Math.random().toString(36).substring(2, 2 + (20 - timestamp.length)); // fill remaining length
    return (timestamp + randomPart).padEnd(20, '0'); // pad in case randomness was short
  }


  export function formatCurrency(value: string | number): string {
  const number = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(number)) return "0.00";

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
}