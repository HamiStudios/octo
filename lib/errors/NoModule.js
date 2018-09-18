"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getError;

function getError(module) {
  return new Error(`The module '${module}' either doesn't exist or is not installed. Failed to serve '${module}' as static files.`);
}