"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const Method = Object.freeze({
  GET: 'GET',
  HEAD: 'HEAD',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  CONNECT: 'CONNECT',
  OPTIONS: 'OPTIONS',
  TRACE: 'TRACE',
  PATCH: 'PATCH',
  ALL: 'ALL',
  // methods
  values: function values() {
    return Object.keys(Method).filter(val => typeof Method[val] === 'string');
  },
  valueOf: function valueOf(value) {
    const valueUpper = value.toString().toUpperCase();
    const values = Method.values();
    return values.indexOf(valueUpper) > -1 ? Method[valueUpper] : undefined;
  }
});
var _default = Method;
exports.default = _default;