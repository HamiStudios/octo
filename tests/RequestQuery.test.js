// lib
import OctoRequestQuery from '../src/RequestQuery';

const queryData = {
  boolean: true,
  string: 'Hello World',
};
let query = null;

beforeEach(() => {
  query = new OctoRequestQuery(queryData);
});

test('.get() should return the specified value', () => {
  expect(query.get('string')).toBe(queryData.string);
});

test('.get() should return the correct value type', () => {
  expect(typeof query.get('boolean')).toBe('boolean');
});

test('.get() should return the default value if the key doesn\'t exist', () => {
  expect(query.get('test', 'default')).toBe('default');
});

test('.exists() should return false when value doesn\'t exists at the specified key', () => {
  expect(query.exists('unknown')).toBeFalsy();
});

test('.exists() should return false when value doesn\'t exists at the specified key', () => {
  expect(query.exists('string')).toBeTruthy();
});

test('.raw() should return a object', () => {
  expect(typeof query.raw()).toBe('object');
});

test('.raw() should return the body object', () => {
  expect(query.raw().string).toBe(queryData.string);
});
