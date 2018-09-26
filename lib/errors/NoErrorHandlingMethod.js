"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getError;

function getError(route) {
  const Instance = route.Instance;
  const handlerInstance = new Instance('', {}, {}, null);
  return new Error(`The error handler '${handlerInstance.constructor.name}' doesn't have any error handling methods. Failed to register.`);
}