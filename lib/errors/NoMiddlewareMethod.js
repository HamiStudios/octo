

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

function getError(route) {
  const Instance = route.Instance;
  const routeInstance = new Instance();
  return new Error(`The middleware '${routeInstance.constructor.name}' doesn't have a 'use' method. Failed to register the middleware.`);
}

const _default = getError;
exports.default = _default;
