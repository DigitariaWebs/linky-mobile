// Random 3G-like latency for mock queries — keeps the loading skeletons honest.
export function latency(): Promise<void> {
  const ms = 300 + Math.random() * 500;
  return new Promise((r) => setTimeout(r, ms));
}
