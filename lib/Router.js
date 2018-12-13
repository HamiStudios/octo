"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _RouteHandler = _interopRequireDefault(require("./RouteHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// octo
class OctoRouter {
  /**
   * Create a new OctoRouter instance
   *
   * @param {string} basePath The router base path
   */
  constructor(basePath) {
    // set the base path
    this.basePath = basePath; // create a new route handler

    this.routeHandler = new _RouteHandler.default();
  }
  /**
   * Check whether the router is an OctoRouter
   *
   * @param {OctoRouter} router The router to check
   *
   * @return {boolean} Whether or not it is an OctoRouter
   */


  static isRouter(router = null) {
    return router !== undefined && router !== null && router instanceof Router;
  }
  /**
   * Get the router base path
   *
   * @return {string} The base path
   */


  getBasePath() {
    return this.basePath;
  }
  /**
   * Add a route to the router
   *
   * @param {OctoRoute} route The route to add
   *
   * @throws {Error} throws when the route can't be added
   *
   * @return {boolean} Whether or not it was added
   */


  addRoute(route) {
    const added = this.routeHandler.add(route);
    if (added) return true;
    throw new Error(`Failed to add route '${route.prototype.constructor.name}' to the router because it isn't an instance of OctoRoute or doesn't have all required properties`);
  }
  /**
   * Add an operation to the router
   *
   * @param {OctoOperation} operation The operation to add
   *
   * @throws {Error} throws when the operation can't be added
   *
   * @return {boolean} Whether or not it was added
   */


  addOperation(operation) {
    const added = this.routeHandler.add(operation);
    if (added) return true;
    throw new Error(`Failed to add operation '${operation.prototype.constructor.name}' to the router because it isn't an instance of OctoOperation or doesn't have all required properties`);
  }
  /**
   * Add an error handler to the router
   *
   * @param {OctoErrorHandler} handler The handler to add
   *
   * @throws {Error} throws when the handler can't be added
   *
   * @return {boolean} Whether or not it was added
   */


  addErrorHandler(handler) {
    const added = this.routeHandler.add(handler);
    if (added) return true;
    throw new Error(`Failed to add error handler '${handler.prototype.constructor.name}' to the router because it isn't an instance of OctoErrorHandler or doesn't have all required properties`);
  }
  /**
   * Get all the routes
   *
   * @return {OctoRoute[]} An array of routes
   */


  getRoutes() {
    return this.routeHandler.getRoutes();
  }
  /**
   * Get all the operations
   *
   * @return {OctoOperation[]} An array of operations
   */


  getOperations() {
    return this.routeHandler.getOperations();
  }
  /**
   * Get all the error handlers
   *
   * @return {OctoErrorHandler[]} An array of error handlers
   */


  getErrorHandlers() {
    return this.routeHandler.getErrorHandlers();
  }
  /**
   * Get all routes, operations and error handlers
   *
   * @return {*[]} An array of all routes, operations and error handlers
   */


  getInstances() {
    return this.routeHandler.getInstances();
  }

}

var _default = OctoRouter;
exports.default = _default;