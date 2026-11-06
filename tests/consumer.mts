import { powerToDb, sumPowerDb } from '@lp-labs/decibel-math';
if (powerToDb(100) !== 20 || Math.abs(sumPowerDb([0, 0]) - 3.0103) > 0.0001) throw new Error('dB');
// @ts-expect-error invalid argument must be rejected by declarations
powerToDb('100');
