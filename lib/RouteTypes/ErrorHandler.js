"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _internals = require("../internals");

// octo
class OctoErrorHandler {
  /**
   * Create a new OctoErrorHandler instance
   *
   * @param {OctoRequest} request The request instance
   * @param {OctoResponse} response The response instance
   * @param {Function} next The next callback handler
   */
  constructor(request, response, next) {
    this.request = request;
    this.response = response;
    this.next = next;
  }
  /**
   * Check whether the handler is an OctoErrorHandler
   *
   * @param {OctoErrorHandler} Handler The handler to check
   *
   * @return {boolean} Whether or not it is an OctoErrorHandler
   */


  static isHandler(Handler = null) {
    const instance = new Handler();
    return Handler !== undefined && Handler !== null && instance instanceof OctoErrorHandler && (0, _internals.hasProp)(Handler, 'error', 'number', true, true) && (0, _internals.hasProp)(Handler, 'method', 'string', true) && (0, _internals.hasProp)(Handler, 'path', 'string', false) && (0, _internals.hasFunction)(instance, 'handle', true);
  }
  /**
   * Get the request instance
   *
   * @return {OctoRequest}
   */


  getRequest() {
    return this.request;
  }
  /**
   * Get the response instance
   *
   * @return {OctoResponse}
   */


  getResponse() {
    return this.response;
  }

}

var _default = OctoErrorHandler;
exports.default = _default;