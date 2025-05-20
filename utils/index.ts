export function generateUniqueString(): string {
    const timestamp = Date.now().toString(36); // base-36 timestamp
    const randomPart = Math.random().toString(36).substring(2, 2 + (20 - timestamp.length)); // fill remaining length
    return (timestamp + randomPart).padEnd(20, '0'); // pad in case randomness was short
  }