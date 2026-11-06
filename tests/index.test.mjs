import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('power decade', () => {
  assert.equal(api.powerToDb(100), 20);
  assert.equal(api.dbToPower(-20), 0.01);
});
test('amplitude decade', () => {
  assert.equal(api.amplitudeToDb(10), 20);
  assert.equal(api.dbToAmplitude(40), 100);
});
test('uncorrelated addition', () => {
  assert.ok(Math.abs(api.sumPowerDb([60, 60]) - 63.01029995664) < 1e-10);
});
test('stable extremes', () => {
  assert.ok(Math.abs(api.sumPowerDb([3000, 3000]) - 3003.01029995664) < 1e-9);
  assert.equal(api.sumPowerDb([-3000]), -3000);
});
test('explicit domain errors', () => {
  assert.throws(() => api.powerToDb(0));
  assert.throws(() => api.amplitudeToDb(-1));
  assert.throws(() => api.dbToPower(4000));
  assert.throws(() => api.dbToPower(-4000));
  assert.throws(() => api.sumPowerDb([]));
});
test('direct power-sum oracle', () => {
  for (let x = -50; x <= 50; x += 5) {
    const expected = 10 * Math.log10(10 ** (x / 10) + 10 ** ((x + 7) / 10));
    assert.ok(Math.abs(api.sumPowerDb([x, x + 7]) - expected) < 1e-12);
  }
});
