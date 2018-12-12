"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _https = _interopRequireDefault(require("https"));

var _o = require("o");

var _express = _interopRequireDefault(require("express"));

var _Protocol = _interopRequireDefault(require("./enums/Protocol"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

  /**
   * Create a new OctoServer instance
   *
   * @param {defaultOptions} options The server options
   */
  constructor(options) {
    this.options = (0, _o.merge)(Server.defaultOptions, options); // create an express app

    this.expressApp = (0, _express.default)();
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
      this.expressApp.use(_express.default.static(directory));
    } else {
      this.expressApp.use(basePath, _express.default.static(directory));
    }
  }
  /**
   * Serve the specified node module as static files
   *
   * @param {string|string[]} modules The name of the module or array of modules
   * @param {string} [basePath=''] The base path to serve the content under
   */


  staticModule(modules, basePath = '') {
    const getModulePath = module => {
      const modulePath = _path.default.resolve(process.cwd(), 'node_modules', module);

      if (_fs.default.existsSync(modulePath) && _fs.default.statSync(modulePath).isDirectory()) {
        return modulePath;
      }

      throw new Error(`The module '${module}' either doesn't exist or is not installed. Failed to serve '${module}' as static files.`);
    };

    const serve = (module, modulePath) => {
      if (basePath === '') {
        this.expressApp.use(`/${module}`, _express.default.static(modulePath));
      } else {
        this.expressApp.use(`${basePath}/${module}`, _express.default.static(modulePath));
      }
    }; // if only one module is specified


    if (typeof modules === 'string') {
      const module = modules;
      const modulePath = getModulePath(module);
      serve(module, modulePath);
    } else {
      // if multiple modules are specified (in an array)
      modules.forEach(module => {
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
    const options = (0, _o.merge)({
      extended: true
    }, urlEncodedOptions);
    this.expressApp.use(_express.default.json());
    this.expressApp.use(_express.default.urlencoded(options));
  }
  /**
   * Start the express server
   *
   * @return {Socket} The listening socket
   */


  async boot() {
    // check whether ssl is enabled and the private key and certificate paths exist
    if (this.options.ssl && this.options.ssl !== undefined) {
      if (this.options.ssl.privateKey !== null && this.options.ssl.certificate !== null && this.options.ssl.privateKey !== undefined && this.options.ssl.certificate !== undefined) {
        const privateKeyPath = this.options.ssl.privateKey;
        const certificatePath = this.options.ssl.certificate; // get private key and certificate

        const ssl = {
          key: _fs.default.readFileSync(privateKeyPath),
          cert: _fs.default.readFileSync(certificatePath)
        }; // start a https server

        this.serverListener = await _https.default.createServer(ssl, this.expressApp).listen(this.options.port, this.options.host);
      } else {
        throw new Error('You must specify the SSL key & certificate file paths when SSL is enabled');
      }
    } else {
      // start a http server
      this.serverListener = await this.expressApp.listen(this.options.port, this.options.host);
    }

    return this.serverListener;
  }

}

_defineProperty(Server, "defaultOptions", {
  protocol: _Protocol.default.HTTP,
  port: 6262,
  host: '127.0.0.1'
});

var _default = Server;
exports.default = _default;