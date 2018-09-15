

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;
const OctoMethod = Object.freeze({
  GET: 'GET',
  HEAD: 'HEAD',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  CONNECT: 'CONNECT',
  OPTIONS: 'OPTIONS',
  TRACE: 'TRACE',
  PATCH: 'PATCH',
  // methods
  values: function values() {
    return Object.keys(OctoMethod).filter(val => typeof OctoMethod[val] === 'string');
  },
  valueOf: function valueOf(value) {
    const valueUpper = value.toString().toUpperCase();
    const values = OctoMethod.values();
    return values.indexOf(valueUpper) > -1 ? OctoMethod[valueUpper] : undefined;
  },
});
const _default = OctoMethod;
exports.default = _default;
