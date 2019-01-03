// npm
import { merge as assign, is as isObject } from 'o';
import helmet from 'helmet';
import { Router as ExpressRouter } from 'express';

// octo
import OctoRouteHandler from './RouteHandler';
import OctoRouter from './Router';
import OctoRoute from './Actions/Route';
import OctoOperation from './Actions/Operation';
import OctoErrorHandler from './Actions/ErrorHandler';

// package
import Package from '../package';

class OctoApp {
  /**
   * @typedef {Object} AppOptions
   *
   * @property {boolean} sendSoftwareHeader Whether to send the X-Powered-By header (helmet must
   *                                        be enabled)
   * @property {Object|boolean} helmet See https://github.com/helmetjs/helmet
   * @property {string[]} [helmet.modules] An array of modules to enable
   * @property {Object} [helmet.options] The options to pass to helmet (only when modules isn't
   *                                     defined)
   */
  static AppOptions = {
    sendSoftwareHeader: true,
    helmet: true,
  };

  /**
   * Create a new OctoApp instance
   *
   * @param {AppOptions} options = {} The custom options to set
   */
  constructor(options = {}) {
    // merge the options onto the default options
    /**
     * @private
     * @type AppOptions
     */
    this.options = assign(OctoApp.AppOptions, options);

    // create a new route handler
    /**
     * @private
     */
    this.routeHandler = new OctoRouteHandler();

    /**
     * @private
     */
    this.compiledRoutes = [];
  }

  /**
   * Setup the server
   *
   * @private
   *
   * @param {OctoServer} server The server to setup
   */
  init(server) {
    // clear compiled routes
    this.compiledRoutes = [];

    // if options.helmet is an object or is enabled
    if (isObject(this.options.helmet) || this.options.helmet === true) {
      // if options.helmet.modules is an array
      if (Array.isArray(this.options.helmet.modules)) {
        // loop over the modules and enable them
        this.options.helmet.modules.forEach((module) => {
          const moduleMiddleware = helmet[module];

          if (typeof moduleMiddleware === 'function') {
            // add the module as a middleware to the express app
            server.getExpressApp().use(moduleMiddleware());
          } else {
            throw new Error('App options (helmet.modules) contains an invalid module name. Please refer to https://helmetjs.github.io/docs/ for a list of modules');
          }
        });
      } else {
        // if options.helmet.modules isn't defined or isn't an array enable helmet as default
        // check if options.helmet.options is defined, if it is an it is an object use it for
        // the helmet options
        const helmetOptions = isObject(this.options.helmet.options)
          ? this.options.helmet.options
          : null;

        // add the default helmet middlware using the options if defined
        server.getExpressApp().use(helmet(helmetOptions));
      }

      // if options.sendSoftwareHeader is true set the X-Powered-By header
      // to "Octo/{version} & Express"
      if (this.options.sendSoftwareHeader) {
        // format the header
        const header = `Octo/${Package.version} & Express`;

        // set the header using helmet
        server.getExpressApp().use(helmet.hidePoweredBy({
          setTo: header,
        }));
      } else {
        // if it isn't enabled disable it using helmet
        server.getExpressApp().use(helmet.hidePoweredBy());
      }
    }
  }

  /**
   * Add a route to the app
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
    throw new Error(`Failed to add route '${route.prototype.constructor.name}' to the app because it isn't an instance of OctoRoute or doesn't have all required properties`);
  }

  /**
   * Add an operation to the app
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
    throw new Error(`Failed to add operation '${operation.prototype.constructor.name}' to the app because it isn't an instance of OctoOperation or doesn't have all required properties`);
  }

  /**
   * Add an error handler to the app
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
    throw new Error(`Failed to add error handler '${handler.prototype.constructor.name}' to the app because it isn't an instance of OctoErrorHandler or doesn't have all required properties`);
  }

  /**
   * Add a router to the app
   *
   * @param {OctoRouter} router The router to add
   *
   * @throws {Error} throws when the router can't be added
   *
   * @return {boolean} Whether or not it was added
   */
  addRouter(router) {
    const added = this.routeHandler.add(router);

    if (added) return true;
    throw new Error(`Failed to add router '${router.prototype.constructor.name}' to the app because it isn't an instance of OctoRouter`);
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
   * Get all routers
   *
   * @return {OctoRouter[]} An array of routers
   */
  getRouters() {
    return this.routeHandler.getRouters();
  }

  /**
   * Get compiled routes
   *
   * @returns {Object[]} Get an array of compiled routes
   */
  getCompiledRoutes() {
    return this.compiledRoutes;
  }

  /**
   * Start the app
   *
   * @param {OctoServer} server The server to start
   */
  async start(server) {
    this.init(server);

    const bindActions = (routeHandler, expressApp, prefix = '') => {
      routeHandler.getInstances().forEach((Instance) => {
        if (OctoRouter.isRouter(Instance)) {
          // add all routes, operations, error handlers and inner routes to the express app
          const router = new ExpressRouter();

          bindActions(Instance.routeHandler, router, `${prefix}${Instance.getBasePath()}`);

          expressApp.use(Instance.getBasePath(), router);
        } else if (OctoRoute.isRoute(Instance)) {
          // add the route to the express app
          OctoRoute.attach(expressApp, Instance);

          if (Array.isArray(Instance.path)) {
            Instance.path.forEach((path) => {
              this.compiledRoutes.push({
                method: Instance.method,
                path: `${prefix}${path}`,
                instance: Instance,
              });
            });
          } else {
            this.compiledRoutes.push({
              method: Instance.method,
              path: `${prefix}${Instance.path}`,
              instance: Instance,
            });
          }
        } else if (OctoOperation.isOperation(Instance)) {
          // add the operator to the express app
          OctoOperation.attach(expressApp, Instance);
        }
      });

      // add a 404 handler
      expressApp.use((request, response, next) => {
        if (response.statusCode === 200) {
          response.status(404);
        }
        next();
      });

      routeHandler.getErrorHandlers().forEach((Instance) => {
        // add the error handler to the express app
        OctoErrorHandler.attach(expressApp, Instance);
      });
    };

    bindActions(this.routeHandler, server.getExpressApp());

    return server.boot();
  }
}

export default OctoApp;
