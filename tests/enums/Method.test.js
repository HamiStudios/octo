// lib
import OctoMethod from '../../src/enums/Method';

test('.values() should an array', () => {
  expect(Array.isArray(OctoMethod.values())).toBeTruthy();
});

test('.values() should an array of strings', () => {
  const values = OctoMethod.values();
  let notString = false;

  values.forEach((value) => {
    if (typeof value !== 'string') notString = true;
  });

  expect(notString).toBeFalsy();
});

test('.values() should\'nt be empty', () => {
  expect(OctoMethod.values().length).toBeGreaterThan(0);
});

test('.valueOf() should return "GET" when "gEt" is specified', () => {
  expect(OctoMethod.valueOf('gEt')).toBe('GET');
});

test('.valueOf() should return undefined when "unknown" is specified', () => {
  expect(OctoMethod.valueOf('unknown')).toBe(undefined);
});
