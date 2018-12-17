// octo
import OctoRoute from './Actions/Route';
import OctoOperation from './Actions/Operation';
import OctoErrorHandler from './Actions/ErrorHandler';
import OctoRouter from './Router';

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
    return OctoRouter.isRouter(instance)
      || OctoRoute.isRoute(instance)
      || OctoOperation.isOperation(instance)
      || OctoErrorHandler.isHandler(instance);
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
    return this.instances
      .filter(i => OctoRoute.isRoute(i));
  }

  /**
   * Get all the operations
   *
   * @return {OctoOperation[]} An array of operations
   */
  getOperations() {
    return this.instances
      .filter(i => OctoOperation.isOperation(i));
  }

  /**
   * Get all the error handlers
   *
   * @return {OctoErrorHandler[]} An array of error handlers
   */
  getErrorHandlers() {
    return this.instances
      .filter(i => OctoErrorHandler.isHandler(i));
  }

  /**
   * Get all routers
   *
   * @return {OctoRouter[]} An array of routers
   */
  getRouters() {
    return this.instances
      .filter(i => OctoRouter.isRouter(i));
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

export default OctoRouteHandler;
