// npm
import fs from 'fs';
import path from 'path';
import assign from 'circle-assign';
import express from 'express';

// lib
import OctoRouter from './Router';
import OctoRoute from './Route';
import OctoMiddleware from './Middleware';

// enums
import OctoProtocol from './enums/Protocol';

// util
import ServerHelper from './util/ServerHelper';

// errors
import NoModule from './errors/NoModule';

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
    this.routers = [];
    this.routes = [];
    this.middlewares = [];
    this.nodeModulesDirectory = null;

    // create an express app
    this.expressApp = express();
  }

  /**
   * Define a new router
   *
   * @param {OctoRouter} router The router instance
   *
   * @return {boolean} Whether or not it was successfully added
   */
  router(router) {
    if (router instanceof OctoRouter) {
      this.routers.push(router);
      return true;
    }
    return false;
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
   * Serve the specified directory as static files
   *
   * @param {string} directory Path to the directory to serve
   * @param {string} [basePath=''] The base path to serve the content under
   */
  static(directory, basePath = '') {
    if (basePath === '') {
      this.expressApp.use(express.static(directory));
    } else {
      this.expressApp.use(basePath, express.static(directory));
    }
  }

  /**
   * Serve the specified node module as static files
   *
   * @param {string|string[]} modules The name of the module or array of modules
   * @param {string} [basePath=''] The base path to serve the content under
   */
  staticModule(modules, basePath = '') {
    const getModulePath = (module) => {
      const modulePath = path.resolve(process.cwd(), 'node_modules', module);

      if (fs.existsSync(modulePath) && fs.statSync(modulePath).isDirectory()) {
        return modulePath;
      }

      throw NoModule(module);
    };

    const serve = (module, modulePath) => {
      if (basePath === '') {
        this.expressApp.use(`/${module}`, express.static(modulePath));
      } else {
        this.expressApp.use(`${basePath}/${module}`, express.static(modulePath));
      }
    };

    // if only one module is specified
    if (typeof modules === 'string') {
      const module = modules;
      const modulePath = getModulePath(module);

      serve(module, modulePath);
    } else {
      // if multiple modules are specified (in an array)
      modules.forEach((module) => {
        const modulePath = getModulePath(module);

        serve(module, modulePath);
      });
    }
  }

  /**
   * Set the render engine used by express
   *
   * @param {string} name The render engine name
   * @param {function} execFunction The function which is normally returned when creating the render
   *                                engine instance
   */
  setRenderEngine(name, execFunction) {
    this.expressApp.engine(name, execFunction);
    this.expressApp.set('view engine', name);
  }

  /**
   * Set the default data value for the render engine
   *
   * @param {Object} data The default data
   */
  setDefaultRenderData(data) {
    this.expressApp.defaultRenderData = data;
  }

  /**
   * Start the server
   *
   * @param {function(listener: Socket)} [callback] Callback which is called once the server
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

    // add the routers to the express app
    ServerHelper.addRouters(this.expressApp, this.routers);

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
