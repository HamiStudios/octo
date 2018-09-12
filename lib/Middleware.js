"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class OctoMiddleware {
  /**
   * Create a new OctoMiddleware
   *
   * @param {OctoMiddlewareContext} context The route context
   */
  constructor(context) {
    this.context = context;
  }
  /**
   * Get the request instance
   *
   * @return {OctoRequest}
   */


  getRequest() {
    return this.context.request;
  }
  /**
   * Get the response instance
   *
   * @return {OctoResponse}
   */


  getResponse() {
    return this.context.response;
  }
  /**
   * Continue to the next handler
   */


  nextHandler() {
    this.context.nextHandlerCallback();
  }

}

var _default = OctoMiddleware;
exports.default = _default;