import { test } from 'node:test';
import assert from 'node:assert/strict';
import { comparison, decode, totalVolume, validate, type Workout } from '../src/lib/workouts.ts';
const base: Workout = { id: 'a', createdAt: '2026-11-20T12:00:00.000Z', title: 'Upper body', exercises: [{ name: 'Bench press', sets: 3, reps: 10, weight: 100 }], effort: 7, notes: '' };
const next: Workout = { ...base, id: 'b', createdAt: '2026-11-21T12:00:00.000Z', exercises: [{ ...base.exercises[0], weight: 110 }] };
test('volume sums every exercise', () => assert.equal(totalVolume([...base.exercises, { name: 'Row', sets: 2, reps: 8, weight: 50 }]), 3800));
test('same exercise gains 10 percent and matches normalized names', () => assert.equal(comparison(next, { ...next.exercises[0], name: ' BENCH   PRESS ' }, [base, next]), 10));
test('missing, unrelated and zero baselines have no comparison', () => { assert.equal(comparison(base, base.exercises[0], [base, next]), null); assert.equal(comparison(next, { ...next.exercises[0], name: 'Squat' }, [base]), null); assert.equal(comparison(next, next.exercises[0], [{ ...base, exercises: [{ ...base.exercises[0], weight: 0 }] }]), null); });
test('latest earlier session wins; future sessions are ignored', () => { const middle = { ...base, id: 'c', createdAt: '2026-11-21T10:00:00.000Z', exercises: [{ ...base.exercises[0], weight: 120 }] }; assert.ok(Math.abs(comparison(next, next.exercises[0], [base, middle, next])! + 8.333333333333332) < 0.0001); });
test('editing baseline recalculates comparisons', () => assert.equal(comparison(next, next.exercises[0], [{ ...base, exercises: [{ ...base.exercises[0], weight: 110 }] }]), 0));
test('valid workouts and zero external weight are accepted', () => { assert.equal(validate(base), null); assert.equal(validate({ ...base, exercises: [{ ...base.exercises[0], weight: 0 }], effort: null }), null); });
test('blank fields, duplicates, invalid counts, weights and effort are rejected', () => {
  const invalid = [{ ...base, title: ' ' }, { ...base, exercises: [] }, { ...base, exercises: [base.exercises[0], { ...base.exercises[0], name: ' BENCH press' }] }, ...['name', 'sets', 'reps', 'weight'].flatMap(field => (field === 'name' ? [''] : [-1, NaN, Infinity]).map(value => ({ ...base, exercises: [{ ...base.exercises[0], [field]: value }] }))), { ...base, effort: 0 }, { ...base, effort: 11 }, { ...base, effort: 1.5 }, { ...base, exercises: [{ ...base.exercises[0], sets: 1.5 }] }];
  for (const w of invalid) assert.ok(validate(w as Workout));
});
test('storage round trip sorts newest first and preserves all fields', () => assert.deepEqual(decode(JSON.stringify({ version: 1, workouts: [base, next] })), [next, base]));
test('missing storage is empty; corrupted data fails closed', () => { assert.deepEqual(decode(null), []); for (const raw of ['bad', '{}', '{"version":2,"workouts":[]}', JSON.stringify({ version: 1, workouts: [base, base] }), JSON.stringify({ version: 1, workouts: [{ ...base, exercises: [{}] }] })]) assert.throws(() => decode(raw)); });
