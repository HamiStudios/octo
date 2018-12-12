"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _internals = require("../internals");

// octo
class OctoRoute {
  /**
   * Create a new OctoRoute instance
   *
   * @param {OctoContext} context The request context
   */
  constructor(context) {
    this.ctx = context;
  }
  /**
   * Check whether the route is an OctoRoute
   *
   * @param {OctoRoute} Route The route to check
   *
   * @return {boolean} Whether or not it is an OctoRoute
   */


  static isRoute(Route = null) {
    const instance = new Route();
    return Route !== undefined && Route !== null && instance instanceof OctoRoute && (0, _internals.hasProp)(Route, 'method', 'string', true, true) && (0, _internals.hasProp)(Route, 'path', 'string', false, true) && (0, _internals.hasFunction)(instance, 'render', true) && (0, _internals.hasFunction)(instance, 'before') && (0, _internals.hasFunction)(instance, 'after');
  }
  /**
   * Get the request instance
   *
   * @return {OctoRequest}
   */


  getRequest() {
    return this.ctx.request;
  }
  /**
   * Get the express request object
   *
   * @return {Object}
   */


  getExpressRequest() {
    return this.ctx.express.request;
  }
  /**
   * Get the response instance
   *
   * @return {OctoResponse}
   */


  getResponse() {
    return this.ctx.response;
  }
  /**
   * Get the express response object
   *
   * @return {Object}
   */


  getExpressResponse() {
    return this.ctx.express.response;
  }

}

var _default = OctoRoute;
exports.default = _default;