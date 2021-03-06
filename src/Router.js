import OctoRoute from './Route';
import OctoMiddleware from './Middleware';

class OctoRouter {
  /**
   * Create a new OctoRouter instance
   *
   * @param {string} basePath The router base path
   */
  constructor(basePath) {
    this.basePath = basePath;
    this.routes = [];
    this.middlewares = [];
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
   * Define a new route
   *
   * @param {string} path The route path
   * @param {OctoRoute} instance The route instance
   *
   * @return {boolean} Whether or not it was successfully added
   */
  route(path, instance) {
    const Instance = instance;

    if (new Instance() instanceof OctoRoute) {
      this.routes.push({
        path,
        Instance,
      });
      return true;
    }
    return false;
  }

  /**
   * Get an array of all defined routes
   *
   * @return {OctoRoute[]} The routes
   */
  getRoutes() {
    return this.routes;
  }

  /**
   * Define a new middleware
   *
   * @param {OctoMiddleware} instance The middleware instance
   * @param {boolean} [afterRoutes=false] Whether or not the middleware should run before or after
   *                                      all the necessary routes are ran
   *
   * @return {boolean} Whether or not it was successfully added
   */
  middleware(instance, afterRoutes = false) {
    const Instance = instance;

    if (new Instance() instanceof OctoMiddleware) {
      this.middlewares.push({
        afterRoutes,
        Instance,
      });
      return true;
    }
    return false;
  }

  /**
   * Get an array of all defined middlewares
   *
   * @return {OctoMiddleware[]} The middlewares
   */
  getMiddlewares() {
    return this.middlewares;
  }
}

export default OctoRouter;
