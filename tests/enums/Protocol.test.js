// lib
import OctoProtocol from '../../src/enums/Protocol';

test('.values() should an array', () => {
  expect(Array.isArray(OctoProtocol.values())).toBeTruthy();
});

test('.values() should an array of strings', () => {
  const values = OctoProtocol.values();
  let notString = false;

  values.forEach((value) => {
    if (typeof value !== 'string') notString = true;
  });

  expect(notString).toBeFalsy();
});

test('.values() should\'nt be empty', () => {
  expect(OctoProtocol.values().length).toBeGreaterThan(0);
});

test('.valueOf() should return "http" when "HTtp" is specified', () => {
  expect(OctoProtocol.valueOf('HTtp')).toBe('http');
});

test('.valueOf() should return undefined when "unknown" is specified', () => {
  expect(OctoProtocol.valueOf('unknown')).toBe(undefined);
});
