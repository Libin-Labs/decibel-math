# @lp-labs/decibel-math

Power/amplitude ratios and stable decibel-level summation.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/decibel-math
```

## Working example

```js
import { powerToDb, sumPowerDb } from '@lp-labs/decibel-math';
if (powerToDb(100) !== 20 || Math.abs(sumPowerDb([0, 0]) - 3.0103) > 0.0001) throw new Error('dB');
```

CommonJS: `const api = require('@lp-labs/decibel-math')`.

## Behavior, customization and limits

powerToDb uses 10log10, amplitudeToDb uses20log10; strictly positive finite ratios. dbToPower/dbToAmplitude require finite dB and throw on underflow-to-zero or overflow. sumPowerDb adds uncorrelated power levels with max-shift stabilization (1..10000 finite levels), not coherent waveform amplitudes. Equal levels add3.0103dB. O(levels); references must be chosen by caller, not LUFS/audio metrology.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export declare function powerToDb(ratio: number): number;
export declare function amplitudeToDb(ratio: number): number;
export declare function dbToPower(db: number): number;
export declare function dbToAmplitude(db: number): number;
export declare function sumPowerDb(levels: readonly number[]): number;
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
