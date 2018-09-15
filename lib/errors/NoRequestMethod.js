

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

function getError(route) {
  const path = route.path;


  const RouteInstance = route.instance;
  const routeInstance = new RouteInstance();
  return new Error(`The route '${routeInstance.constructor.name}' doesn't have any request methods. Failed to register endpoint '${path}'.`);
}

const _default = getError;
exports.default = _default;
