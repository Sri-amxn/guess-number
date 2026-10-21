export const MIN = 1;
export const MAX = 30;
export const MAX_ATTEMPTS = 5;
export const CLOSE_RANGE = 3; // within 3 of the secret counts as "close"

export const randomNumber = () =>
  Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;

// Returns "correct", "close" or "far"
export function checkGuess(guess, secret) {
  const diff = Math.abs(guess - secret);
  if (diff === 0) return "correct";
  if (diff <= CLOSE_RANGE) return "close";
  return "far";
}