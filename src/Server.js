// npm
import assign from 'circle-assign';
import express from 'express';

// lib
import OctoRoute from './Route';
import OctoMiddleware from './Middleware';

// enums
import OctoProtocol from './enums/Protocol';

// util
import ServerHelper from './util/ServerHelper';

/**
 * @typedef ServerOptions
 * @type {Object}
 *
 * @property {OctoProtocol} protocol The protocol the server should use
 * @property {string} host The host the server should use
 * @property {number} port The port the server should use
 * @property {Object} ssl The SSL options the server should use
 * @property {boolean} ssl.enabled Whether or not the server should use SSL
 * @property {string} ssl.cert The path to the certificate
 * @property {string} ssl.key The path to the key
 */
const ServerOptions = {
  protocol: OctoProtocol.HTTP,
  host: 'localhost',
  port: 8585,
  ssl: {
    enabled: false,
    cert: null,
    key: null,
  },
};

class Server {
  constructor(options) {
    this.options = assign(ServerOptions, options);
    this.routes = [];
    this.middlewares = [];

    // create an express app
    this.expressApp = express();
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
   * Set a server value with the specified name and value
   *
   * @param {string} name The setting name
   * @param {*} value The setting value
   */
  set(name, value) {
    this.expressApp.set(name, value);
  }

  /**
   * Get the specified server setting value
   *
   * @param {string} name The setting name
   *
   * @return {*} The setting value
   */
  get(name) {
    return this.expressApp.get(name);
  }

  /**
   * Start the server
   *
   * @param {function(listener: net.Socket)} [callback] Callback which is called once the server
   *                                                    is listening and with the listener
   */
  start(callback = () => {}) {
    // enable body parsing
    this.expressApp.use(express.json());
    this.expressApp.use(express.urlencoded({
      extended: true,
    }));

    // add the middlewares which run before the routes to the express app
    ServerHelper.addMiddlewares(
      this.expressApp,
      this.middlewares.filter(mw => mw.afterRoutes === false),
    );

    // add the routes to the express app
    ServerHelper.addRoutes(this.expressApp, this.routes);

    // add the middlewares which run after the routes to the express app
    ServerHelper.addMiddlewares(
      this.expressApp,
      this.middlewares.filter(mw => mw.afterRoutes === true),
    );

    // start the server
    this.serverListener = this.expressApp
      .listen(this.options.port, this.options.host, () => {
        if (typeof callback === 'function') callback(this.serverListener);
      });
  }
}

export default Server;
