"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class OctoExpressContext {
  /**
   * Create a new OctoRouteContext
   *
   * @param {OctoRequest} request The OctoRequest instance
   * @param {OctoResponse} response The OctoResponse instance
   * @param {function} nextHandler Callback to continue to next handler
   */
  constructor(request, response, nextHandler) {
    this.request = request;
    this.response = response;
    this.nextHandlerCallback = nextHandler;
  }

}

var _default = OctoExpressContext;
exports.default = _default;