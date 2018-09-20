// lib
import NoMiddlewareMethod from '../../src/errors/NoMiddlewareMethod';
import OctoMiddleware from '../../src/Middleware';

test('NoMiddlewareMethod should be a function', () => {
  expect(typeof NoMiddlewareMethod).toBe('function');
});

test('should return an Error instance', () => {
  class TestMiddleware extends OctoMiddleware {}

  expect(NoMiddlewareMethod({ Instance: TestMiddleware })).toBeInstanceOf(Error);
});
