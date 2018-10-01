// lib
import OctoStatusCode from '../../src/enums/StatusCode';

test('.values() should an array', () => {
  expect(Array.isArray(OctoStatusCode.values())).toBeTruthy();
});

test('.values() should an array of numbers', () => {
  const values = OctoStatusCode.values();
  let notString = false;

  values.forEach((value) => {
    if (typeof value !== 'string') notString = true;
  });

  expect(notString).toBeFalsy();
});

test('.values() should\'nt be empty', () => {
  expect(OctoStatusCode.values().length).toBeGreaterThan(0);
});

test('.valueOf() should return "Error200" when "ErRor200" is specified', () => {
  expect(OctoStatusCode.valueOf('ErRor200')).toBe(200);
});

test('.valueOf() should return "Error200" when "200" is specified', () => {
  expect(OctoStatusCode.valueOf('200')).toBe(200);
});

test('.valueOf() should return undefined when "unknown" is specified', () => {
  expect(OctoStatusCode.valueOf('unknown')).toBe(undefined);
});
