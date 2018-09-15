

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _Request = _interopRequireDefault(require('../Request'));

const _Response = _interopRequireDefault(require('../Response'));

const _RouteContext = _interopRequireDefault(require('../RouteContext'));

const _MiddlewareContext = _interopRequireDefault(require('../MiddlewareContext'));

const _Method = _interopRequireDefault(require('../enums/Method'));

const _Validator = _interopRequireDefault(require('./Validator'));

const _NoRequestMethod = _interopRequireDefault(require('../errors/NoRequestMethod'));

const _NoMiddlewareMethod = _interopRequireDefault(require('../errors/NoMiddlewareMethod'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// lib
// enums
// util
// errors
class ServerHelper {
  /**
   * Add an array of routes to the specified express app
   *
   * @param {Express} expressApp The express app
   * @param {OctoRoute[]} routes The routes
   */
  static addRoutes(expressApp, routes) {
    // get an array of all method names in lowercase
    const methods = _Method.default.values().map(method => method.toLowerCase()); // for each route


    routes.forEach((route) => {
      const path = route.path;


      const Instance = route.Instance; // check if the route has any request method functions

      if (_Validator.default.hasRequestMethod(Instance)) {
        // get all the functions
        const functions = Object.getOwnPropertyNames(Instance.prototype); // for each methods

        methods.forEach((method) => {
          // check if the route has a function for the method
          if (functions.indexOf(method) > -1) {
            // if it does add it to the express routes for that method
            expressApp[method](path, (expressRequest, expressResponse, nextHandler) => {
              // create the request and response instances
              const request = new _Request.default(expressRequest);
              const response = new _Response.default(expressResponse); // create the route context

              const context = new _RouteContext.default(path, request, response, nextHandler); // create the route instance

              const routeInstance = new Instance(context); // run the method function

              routeInstance[method]();
            });
          }
        });
      } else {
        throw (0, _NoRequestMethod.default)(route);
      }
    });
  }

  static addMiddlewares(expressApp, middlewares) {
    // for each middleware
    middlewares.forEach((middleware) => {
      const Instance = middleware.Instance; // check if the middleware has the 'use' function

      if (_Validator.default.hasMiddlewareMethod(Instance)) {
        // register the middleware
        expressApp.use((expressRequest, expressResponse, nextHandler) => {
          // create the request and response instances
          const request = new _Request.default(expressRequest);
          const response = new _Response.default(expressResponse); // create the route context

          const context = new _MiddlewareContext.default(request, response, nextHandler); // create the route instance

          const routeInstance = new Instance(context); // run the use function

          routeInstance.use();
        });
      } else {
        throw (0, _NoMiddlewareMethod.default)(middleware);
      }
    });
  }
}

const _default = ServerHelper;
exports.default = _default;
