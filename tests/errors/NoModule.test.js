// lib
import NoModule from '../../src/errors/NoModule';

test('NoModule should be a function', () => {
  expect(typeof NoModule).toBe('function');
});

test('should return an Error instance', () => {
  expect(NoModule('test-module')).toBeInstanceOf(Error);
});
