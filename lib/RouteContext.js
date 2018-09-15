"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class OctoRouteContext {
  /**
   * Create a new OctoRouteContext
   *
   * @param {string} path The route path
   * @param {OctoRequest} request The OctoRequest instance
   * @param {OctoResponse} response The OctoResponse instance
   * @param {function} nextHandler Callback to continue to next handler
   */
  constructor(path, request, response, nextHandler) {
    this.path = path;
    this.request = request;
    this.response = response;
    this.nextHandlerCallback = nextHandler;
  }

}

var _default = OctoRouteContext;
exports.default = _default;