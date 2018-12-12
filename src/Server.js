// node
import fs from 'fs';
import path from 'path';
import https from 'https';

// npm
import { merge as assign } from 'o';
import express from 'express';

// octo
import OctoProtocol from './enums/Protocol';

class Server {
  /**
   * @typedef defaultOptions
   * @type {Object}
   *
   * @property {OctoProtocol} protocol The protocol the server should use
   * @property {string} host The host the server should use
   * @property {number} port The port the server should use
   * @property {Object} ssl The SSL options the server should use
   * @property {boolean} ssl.enabled Whether or not the server should use SSL
   * @property {string} ssl.certificate The path to the certificate
   * @property {string} ssl.privateKey The path to the key
   */
  static defaultOptions = {
    protocol: OctoProtocol.HTTP,
    port: 6262,
    host: '127.0.0.1',
  };

  /**
   * Create a new OctoServer instance
   *
   * @param {defaultOptions} options The server options
   */
  constructor(options) {
    this.options = assign(Server.defaultOptions, options);

    // create an express app
    this.expressApp = express();
  }

  /**
   * Get the express app instance
   *
   * @return {Object} The express app instance
   */
  getExpressApp() {
    return this.expressApp;
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

      throw new Error(`The module '${module}' either doesn't exist or is not installed. Failed to serve '${module}' as static files.`)
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
   * Setup body data parsing
   *
   * @param {object} urlEncodedOptions = {} Custom options to pass to urlencoded
   */
  parseBodyData(urlEncodedOptions = {}) {
    const options = assign({
      extended: true,
    }, urlEncodedOptions);

    this.expressApp.use(express.json());
    this.expressApp.use(express.urlencoded(options));
  }

  /**
   * Start the express server
   *
   * @return {Socket} The listening socket
   */
  async boot() {
    // check whether ssl is enabled and the private key and certificate paths exist
    if (this.options.ssl
        && this.options.ssl !== undefined) {

      if (this.options.ssl.privateKey !== null
          && this.options.ssl.certificate !== null
          && this.options.ssl.privateKey !== undefined
          && this.options.ssl.certificate !== undefined) {
        const privateKeyPath = this.options.ssl.privateKey;
        const certificatePath = this.options.ssl.certificate;

        // get private key and certificate
        const ssl = {
          key: fs.readFileSync(privateKeyPath),
          cert: fs.readFileSync(certificatePath),
        };

        // start a https server
        this.serverListener = await https
          .createServer(ssl, this.expressApp)
          .listen(this.options.port, this.options.host);
      } else {
        throw new Error('You must specify the SSL key & certificate file paths when SSL is enabled');
      }
    } else {
      // start a http server
      this.serverListener = await this.expressApp
        .listen(this.options.port, this.options.host);
    }

    return this.serverListener;
  }
}

export default Server;
