export function randomAlphaNumericString(length: number): string {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }

  return result;
}

export function generateRandomInt(min: number, max: number): number {
  const intMin = Math.ceil(min);
  const intMax = Math.floor(max);

  return Math.floor(Math.random() * (intMax - intMin) + intMin);
}
