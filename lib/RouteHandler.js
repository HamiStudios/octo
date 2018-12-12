"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Route = _interopRequireDefault(require("./Actions/Route"));

var _Operation = _interopRequireDefault(require("./Actions/Operation"));

var _ErrorHandler = _interopRequireDefault(require("./Actions/ErrorHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// octo
class RouteHandler {
  /**
   * Create a new OctoRouteHandler instance
   */
  constructor() {
    this.instances = [];
  }
  /**
   * Check whether the instance is a OctoRoute or OctoOperation
   *
   * @param {Route|Operation|ErrorHandler} instance The instance to check
   *
   * @return {boolean} Whether or not it is an instance
   */


  static validate(instance = null) {
    return _Route.default.isRoute(instance) || _Operation.default.isOperation(instance) || _ErrorHandler.default.isHandler(instance);
  }
  /**
   * Add a new OctoRoute or OctoOperation to the app
   *
   * @param {Route|Operation|ErrorHandler} instance
   *
   * @return {boolean} Whether or not it was added
   */


  add(instance) {
    if (RouteHandler.validate(instance)) {
      this.instances.push(instance);
      return true;
    }

    return false;
  }
  /**
   * Get all the routes
   *
   * @return {Route[]} An array of routes
   */


  getRoutes() {
    return this.instances.filter(i => _Route.default.isRoute(i));
  }
  /**
   * Get all the operations
   *
   * @return {Operation[]} An array of operations
   */


  getOperations() {
    return this.instances.filter(i => _Operation.default.isOperation(i));
  }
  /**
   * Get all the error handlers
   *
   * @return {ErrorHandler[]} An array of error handlers
   */


  getErrorHandlers() {
    return this.instances.filter(i => _ErrorHandler.default.isHandler(i));
  }
  /**
   * Get all routes, operations and error handlers
   *
   * @return {*[]} An array of all routes, operations and error handlers
   */


  getInstances() {
    return this.instances;
  }

}

var _default = RouteHandler;
exports.default = _default;