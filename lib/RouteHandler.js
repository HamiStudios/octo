"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Route = _interopRequireDefault(require("./Actions/Route"));

var _Operation = _interopRequireDefault(require("./Actions/Operation"));

var _ErrorHandler = _interopRequireDefault(require("./Actions/ErrorHandler"));

var _Router = _interopRequireDefault(require("./Router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// octo
class OctoRouteHandler {
  /**
   * Create a new OctoRouteHandler instance
   */
  constructor() {
    this.instances = [];
  }
  /**
   * Check whether the instance is a OctoRoute, OctoOperation, OctoErrorHandler or OctoRouter
   *
   * @param {OctoRoute|OctoOperation|OctoErrorHandler|OctoRouter} instance The instance to check
   *
   * @return {boolean} Whether or not it is an instance
   */


  static validate(instance = null) {
    return _Router.default.isRouter(instance) || _Route.default.isRoute(instance) || _Operation.default.isOperation(instance) || _ErrorHandler.default.isHandler(instance);
  }
  /**
   * Add a new OctoRoute, OctoOperation, OctoErrorHandler or OctoRouter to the app
   *
   * @param {OctoRoute|OctoOperation|OctoErrorHandler|OctoRouter} instance
   *
   * @return {boolean} Whether or not it was added
   */


  add(instance) {
    if (OctoRouteHandler.validate(instance)) {
      this.instances.push(instance);
      return true;
    }

    return false;
  }
  /**
   * Get all the routes
   *
   * @return {OctoRoute[]} An array of routes
   */


  getRoutes() {
    return this.instances.filter(i => _Route.default.isRoute(i));
  }
  /**
   * Get all the operations
   *
   * @return {OctoOperation[]} An array of operations
   */


  getOperations() {
    return this.instances.filter(i => _Operation.default.isOperation(i));
  }
  /**
   * Get all the error handlers
   *
   * @return {OctoErrorHandler[]} An array of error handlers
   */


  getErrorHandlers() {
    return this.instances.filter(i => _ErrorHandler.default.isHandler(i));
  }
  /**
   * Get all routers
   *
   * @return {OctoRouter[]} An array of routers
   */


  getRouters() {
    return this.instances.filter(i => _Router.default.isRouter(i));
  }
  /**
   * Get all routes, operations, error handlers and routers
   *
   * @return {*[]} An array of all routes, operations, error handlers and routers
   */


  getInstances() {
    return this.instances;
  }

}

var _default = OctoRouteHandler;
exports.default = _default;