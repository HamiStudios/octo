"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _internals = require("../internals");

// octo
class OctoAction {
  /**
   * Create a new OctoAction instance
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
   * Check whether the action is an OctoAction
   *
   * @param {OctoAction} Action The action to check
   *
   * @return {boolean} Whether or not it is an OctoAction
   */


  static isAction(Action = null) {
    const instance = new Action();
    return Action !== undefined && Action !== null && instance instanceof OctoAction && (0, _internals.hasProp)(Action, 'method', 'string', true) && (0, _internals.hasProp)(Action, 'path', 'string', false) && (0, _internals.hasFunction)(instance, 'execute', true);
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

var _default = OctoAction;
exports.default = _default;