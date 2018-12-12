"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class OctoRoute {
  /**
   * Create a new OctoRoute
   *
   * @param {OctoRequest} request The request instance
   * @param {OctoResponse} response The response instance
   */
  constructor(request, response) {
    this.request = request;
    this.response = response;
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

var _default = OctoRoute;
exports.default = _default;