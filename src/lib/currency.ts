export function convertCentsToDollars(cents: number): string {
  const fractionDigits = cents % 100 === 0 ? 0 : 2;
  const dollars = (cents / 100).toFixed(fractionDigits);
  return `$${dollars}`;
}
