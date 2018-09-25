// lib
import OctoRequestBody from '../src/RequestBody';

const bodyData = {
  boolean: true,
  string: 'Hello World',
  dot: {
    notation: true,
  },
};
let body = null;

beforeEach(() => {
  body = new OctoRequestBody(bodyData);
});

test('.get() should return the specified value', () => {
  expect(body.get('string')).toBe(bodyData.string);
});

test('.get() should return the correct value type', () => {
  expect(typeof body.get('boolean')).toBe('boolean');
});

test('.get() should return the default value if the key doesn\'t exist', () => {
  expect(body.get('test', 'default')).toBe('default');
});

test('.get() should use dot notation to get values', () => {
  expect(body.get('dot.notation')).toBe(bodyData.dot.notation);
});

test('.exists() should return false when value doesn\'t exists at the specified key', () => {
  expect(body.exists('unknown')).toBeFalsy();
});

test('.exists() should return false when value doesn\'t exists at the specified key', () => {
  expect(body.exists('string')).toBeTruthy();
});

test('.raw() should return a object', () => {
  expect(typeof body.raw()).toBe('object');
});

test('.raw() should return the body object', () => {
  expect(body.raw().string).toBe(bodyData.string);
});
