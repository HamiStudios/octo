// lib
import NoRequestMethod from '../../src/errors/NoRequestMethod';
import OctoRoute from '../../src/Route';

test('NoRequestMethod should be a function', () => {
  expect(typeof NoRequestMethod).toBe('function');
});

test('should return an Error instance', () => {
  class TestRoute extends OctoRoute {}

  expect(NoRequestMethod({ Instance: TestRoute, path: '/' })).toBeInstanceOf(Error);
});
