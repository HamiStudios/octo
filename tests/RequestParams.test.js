// lib
import OctoRequestParams from '../src/RequestParams';

const paramsData = {
  boolean: true,
  string: 'Hello World',
};
let params = null;

beforeEach(() => {
  params = new OctoRequestParams(paramsData);
});

test('.get() should return the specified value', () => {
  expect(params.get('string')).toBe(paramsData.string);
});

test('.get() should return the correct value type', () => {
  expect(typeof params.get('boolean')).toBe('boolean');
});

test('.get() should return the default value if the key doesn\'t exist', () => {
  expect(params.get('test', 'default')).toBe('default');
});

test('.exists() should return false when value doesn\'t exists at the specified key', () => {
  expect(params.exists('unknown')).toBeFalsy();
});

test('.exists() should return false when value doesn\'t exists at the specified key', () => {
  expect(params.exists('string')).toBeTruthy();
});

test('.raw() should return a object', () => {
  expect(typeof params.raw()).toBe('object');
});

test('.raw() should return the body object', () => {
  expect(params.raw().string).toBe(paramsData.string);
});
