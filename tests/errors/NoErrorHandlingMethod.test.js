// lib
import NoErrorHandlingMethod from '../../src/errors/NoErrorHandlingMethod';
import OctoErrorHandler from '../../src/ErrorHandler';

test('NoErrorHandlingMethod should be a function', () => {
  expect(typeof NoErrorHandlingMethod).toBe('function');
});

test('should return an Error instance', () => {
  class TestErrorHandler extends OctoErrorHandler {}

  expect(NoErrorHandlingMethod({ Instance: TestErrorHandler })).toBeInstanceOf(Error);
});
