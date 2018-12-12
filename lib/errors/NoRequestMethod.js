"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getError;

function getError(route) {
  const {
    path,
    Instance
  } = route;
  const routeInstance = new Instance('', {}, {}, null);
  return new Error(`The route '${routeInstance.constructor.name}' doesn't have any request methods. Failed to register endpoint '${path}'.`);
}