function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
export function powerToDb(ratio: number): number {
  finite(ratio, Number.MIN_VALUE);
  return finite(10 * Math.log10(ratio));
}
export function amplitudeToDb(ratio: number): number {
  finite(ratio, Number.MIN_VALUE);
  return finite(20 * Math.log10(ratio));
}
export function dbToPower(db: number): number {
  finite(db);
  return finite(10 ** (db / 10), Number.MIN_VALUE);
}
export function dbToAmplitude(db: number): number {
  finite(db);
  return finite(10 ** (db / 20), Number.MIN_VALUE);
}
export function sumPowerDb(levels: readonly number[]): number {
  if (!Array.isArray(levels) || !levels.length || levels.length > 10000)
    throw new RangeError('Level count');
  for (const n of levels) finite(n);
  const m = Math.max(...levels);
  return finite(m + 10 * Math.log10(levels.reduce((s, n) => s + 10 ** ((n - m) / 10), 0)));
}
