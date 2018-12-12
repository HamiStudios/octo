// octo
import Route from './Actions/Route';
import Operation from './Actions/Operation';
import ErrorHandler from './Actions/ErrorHandler';

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
    return Route.isRoute(instance)
      || Operation.isOperation(instance)
      || ErrorHandler.isHandler(instance);
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
    return this.instances
      .filter(i => Route.isRoute(i));
  }

  /**
   * Get all the operations
   *
   * @return {Operation[]} An array of operations
   */
  getOperations() {
    return this.instances
      .filter(i => Operation.isOperation(i));
  }

  /**
   * Get all the error handlers
   *
   * @return {ErrorHandler[]} An array of error handlers
   */
  getErrorHandlers() {
    return this.instances
      .filter(i => ErrorHandler.isHandler(i));
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

export default RouteHandler;
