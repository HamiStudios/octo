"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const Protocol = Object.freeze({
  HTTP: 'http',
  HTTPS: 'https',
  // methods
  values: function values() {
    return Object.keys(Protocol).filter(val => typeof Protocol[val] === 'string');
  },
  valueOf: function valueOf(value) {
    const valueUpper = value.toString().toUpperCase();
    const values = Protocol.values();
    return values.indexOf(valueUpper) > -1 ? Protocol[valueUpper] : undefined;
  }
});
var _default = Protocol;
exports.default = _default;