"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _o = require("o");

var _helmet = _interopRequireDefault(require("helmet"));

var _express = require("express");

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
   * @typedef {Object} AppOptions
   *
   * @property {boolean} sendSoftwareHeader Whether to send the X-Powered-By header (helmet must
   *                                        be enabled)
   * @property {Object|boolean} helmet See https://github.com/helmetjs/helmet
   * @property {string[]} [helmet.modules] An array of modules to enable
   * @property {Object} [helmet.options] The options to pass to helmet (only when modules isn't
   *                                     defined)
   */

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
    this.options = (0, _o.merge)(OctoApp.AppOptions, options); // create a new route handler

    /**
     * @private
     */

    this.routeHandler = new _RouteHandler.default();
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
    this.compiledRoutes = []; // if options.helmet is an object or is enabled

    if ((0, _o.is)(this.options.helmet) || this.options.helmet === true) {
      // if options.helmet.modules is an array
      if (Array.isArray(this.options.helmet.modules)) {
        // loop over the modules and enable them
        this.options.helmet.modules.forEach(module => {
          const moduleMiddleware = _helmet.default[module];

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
        const helmetOptions = (0, _o.is)(this.options.helmet.options) ? this.options.helmet.options : null; // add the default helmet middlware using the options if defined

        server.getExpressApp().use((0, _helmet.default)(helmetOptions));
      } // if options.sendSoftwareHeader is true set the X-Powered-By header
      // to "Octo/{version} & Express"


      if (this.options.sendSoftwareHeader) {
        // format the header
        const header = `Octo/${_package.default.version} & Express`; // set the header using helmet

        server.getExpressApp().use(_helmet.default.hidePoweredBy({
          setTo: header
        }));
      } else {
        // if it isn't enabled disable it using helmet
        server.getExpressApp().use(_helmet.default.hidePoweredBy());
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
      routeHandler.getInstances().forEach(Instance => {
        if (_Router.default.isRouter(Instance)) {
          // add all routes, operations, error handlers and inner routes to the express app
          const router = new _express.Router();
          bindActions(Instance.routeHandler, router, `${prefix}${Instance.getBasePath()}`);
          expressApp.use(Instance.getBasePath(), router);
        } else if (_Route.default.isRoute(Instance)) {
          // add the route to the express app
          _Route.default.attach(expressApp, Instance);

          this.compiledRoutes.push({
            method: Instance.method,
            path: `${prefix}${Instance.path}`
          });
        } else if (_Operation.default.isOperation(Instance)) {
          // add the operator to the express app
          _Operation.default.attach(expressApp, Instance);
        }
      }); // add a 404 handler

      expressApp.use((request, response, next) => {
        if (response.statusCode === 200) {
          response.status(404);
        }

        next();
      });
      routeHandler.getErrorHandlers().forEach(Instance => {
        // add the error handler to the express app
        _ErrorHandler.default.attach(expressApp, Instance);
      });
    };

    bindActions(this.routeHandler, server.getExpressApp());
    return server.boot();
  }

}

_defineProperty(OctoApp, "AppOptions", {
  sendSoftwareHeader: true,
  helmet: true
});

var _default = OctoApp;
exports.default = _default;