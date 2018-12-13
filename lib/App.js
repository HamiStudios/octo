"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _o = require("o");

var _RouteHandler = _interopRequireDefault(require("./RouteHandler"));

var _Router = _interopRequireDefault(require("./Router"));

var _Route = _interopRequireDefault(require("./Actions/Route"));

var _Operation = _interopRequireDefault(require("./Actions/Operation"));

var _ErrorHandler = _interopRequireDefault(require("./Actions/ErrorHandler"));

var _package = _interopRequireDefault(require("../package"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class OctoApp {
  /**
   * Create a new OctoApp instance
   *
   * @param {Object} options = {} The custom options to set
   */
  constructor(options = {}) {
    // merge the options onto the default options

    /**
     * @private
     */
    this.options = (0, _o.merge)(OctoApp.defaultOptions, options); // create a new route handler

    /**
     * @private
     */

    this.routeHandler = new _RouteHandler.default();
  }
  /**
   * Setup the server
   *
   * @private
   *
   * @param {OctoServer} server The server to setup
   */


  init(server) {
    if (this.options.sendSoftwareHeader) {
      const header = `Octo/${_package.default.version} & Express`;
      server.getExpressApp().use((request, response, next) => {
        response.setHeader('X-Powered-By', header);
        next();
      });
    } else {
      server.getExpressApp().disable('x-powered-by');
    }
  }
  /**
   * Add a route to the app
   *
   * @param {Route} route The route to add
   *
   * @throws {Error} throws when the route can't be added
   *
   * @return {boolean} Whether or not it was added
   */


  addRoute(route) {
    const added = this.routeHandler.add(route);
    if (added) return true;
    throw new Error(`Failed to add route '${route.prototype.constructor.name}' to the app because it isn't an instance of OctoRoute or doesn't have all required properties`);
  }
  /**
   * Add an operation to the app
   *
   * @param {Operation} operation The operation to add
   *
   * @throws {Error} throws when the operation can't be added
   *
   * @return {boolean} Whether or not it was added
   */


  addOperation(operation) {
    const added = this.routeHandler.add(operation);
    if (added) return true;
    throw new Error(`Failed to add operation '${operation.prototype.constructor.name}' to the app because it isn't an instance of OctoOperation or doesn't have all required properties`);
  }
  /**
   * Add an error handler to the app
   *
   * @param {ErrorHandler} handler The handler to add
   *
   * @throws {Error} throws when the handler can't be added
   *
   * @return {boolean} Whether or not it was added
   */


  addErrorHandler(handler) {
    const added = this.routeHandler.add(handler);
    if (added) return true;
    throw new Error(`Failed to add error handler '${handler.prototype.constructor.name}' to the app because it isn't an instance of OctoErrorHandler or doesn't have all required properties`);
  }
  /**
   * Add a router to the app
   *
   * @param {Router} router The router to add
   *
   * @throws {Error} throws when the router can't be added
   *
   * @return {boolean} Whether or not it was added
   */


  addRouter(router) {
    if (_Router.default.isRouter(router)) {
      const instances = router.getInstances();
      const count = this.routeHandler.instances.length;
      instances.forEach(i => this.routeHandler.add(i));
      return this.routeHandler.instances.length === count + instances.length;
    }

    throw new Error(`Failed to add router '${router.prototype.constructor.name}' to app because it isn't an instance of OctoRouter`);
  }
  /**
   * Get all the routes
   *
   * @return {Route[]} An array of routes
   */


  getRoutes() {
    return this.routeHandler.getRoutes();
  }
  /**
   * Get all the operations
   *
   * @return {Operation[]} An array of operations
   */


  getOperations() {
    return this.routeHandler.getOperations();
  }
  /**
   * Get all the error handlers
   *
   * @return {ErrorHandler[]} An array of error handlers
   */


  getErrorHandlers() {
    return this.routeHandler.getErrorHandlers();
  }
  /**
   * Start the app
   *
   * @param {OctoServer} server The server to start
   */


  async start(server) {
    this.init(server);
    this.routeHandler.getInstances().forEach(Instance => {
      if (_Route.default.isRoute(Instance)) {
        // add the route to the express app
        _Route.default.attach(server.getExpressApp(), Instance);
      } else if (_Operation.default.isOperation(Instance)) {
        // add the operator to the express app
        _Operation.default.attach(server.getExpressApp(), Instance);
      }
    }); // add a 404 handler

    server.getExpressApp().use((request, response, next) => {
      if (response.statusCode === 200) {
        response.status(404);
      }

      next();
    });
    this.routeHandler.getErrorHandlers().forEach(Instance => {
      // add the error handler to the express app
      _ErrorHandler.default.attach(server.getExpressApp(), Instance);
    });
    return server.boot();
  }

}

_defineProperty(OctoApp, "defaultOptions", {
  sendSoftwareHeader: true
});

var _default = OctoApp;
exports.default = _default;