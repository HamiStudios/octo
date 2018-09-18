"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _Request = _interopRequireDefault(require("../Request"));

var _Response = _interopRequireDefault(require("../Response"));

var _RouteContext = _interopRequireDefault(require("../RouteContext"));

var _MiddlewareContext = _interopRequireDefault(require("../MiddlewareContext"));

var _Method = _interopRequireDefault(require("../enums/Method"));

var _Validator = _interopRequireDefault(require("./Validator"));

var _NoRequestMethod = _interopRequireDefault(require("../errors/NoRequestMethod"));

var _NoMiddlewareMethod = _interopRequireDefault(require("../errors/NoMiddlewareMethod"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// npm
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


    routes.forEach(route => {
      const routePath = route.routePath,
            Instance = route.Instance; // check if the route has any request method functions

      if (_Validator.default.hasRequestMethod(Instance)) {
        // get all the functions
        const functions = Object.getOwnPropertyNames(Instance.prototype); // for each methods

        methods.forEach(method => {
          // check if the route has a function for the method
          if (functions.indexOf(method) > -1) {
            // if it does add it to the express routes for that method
            expressApp[method](routePath, (expressRequest, expressResponse, nextHandler) => {
              // create the request and response instances
              const request = new _Request.default(expressRequest);
              const response = new _Response.default(expressResponse); // create the route context

              const context = new _RouteContext.default(routePath, request, response, nextHandler); // create the route instance

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
  /**
   * Add an array of middlewares to the specified express app
   *
   * @param {Express} expressApp The express app
   * @param {OctoMiddleware[]} middlewares The middlewares
   */


  static addMiddlewares(expressApp, middlewares) {
    // for each middleware
    middlewares.forEach(middleware => {
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
  /**
   * Add an array of routes to the specified express app
   *
   * @param {Express} expressApp The express app
   * @param {OctoRouter[]} routers The routers
   */


  static addRouters(expressApp, routers) {
    routers.forEach(router => {
      const expressRouter = _express.default.Router();

      const middlewares = router.getMiddlewares();
      const routes = router.getRoutes(); // add the middlewares which run before the routes to the router

      this.addMiddlewares(expressRouter, middlewares.filter(mw => mw.afterRoutes === false)); // add the routes to the router

      this.addRoutes(expressRouter, routes); // add the middlewares which run after the routes to the router

      this.addMiddlewares(expressRouter, middlewares.filter(mw => mw.afterRoutes === true));
      expressApp.use(router.getBasePath(), expressRouter);
    });
  }

}

var _default = ServerHelper;
exports.default = _default;