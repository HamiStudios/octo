"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Method = _interopRequireDefault(require("../enums/Method"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// lib
class Validator {
  /**
   * Check whether or not the route has any request method functions
   *
   * @param {OctoRoute} route The route to check
   *
   * @return {boolean} Whether not it has at least one request method function
   */
  static hasRequestMethod(route) {
    // get all the functions
    const functions = Object.getOwnPropertyNames(route.prototype); // get an array of all method names in lowercase

    const methods = _Method.default.values().map(method => method.toLowerCase()); // get an array of all the methods the route has a function for


    const contains = methods.filter(method => functions.indexOf(method) > -1); // if the route contains 1 or more functions it has can be used

    return contains.length > 0;
  }
  /**
   * Check whether or not the middleware has a use function
   *
   * @param {OctoMiddleware} middleware The middleware to check
   *
   * @return {boolean} Whether not it has a use function
   */


  static hasMiddlewareMethod(middleware) {
    // get all the functions
    const functions = Object.getOwnPropertyNames(middleware.prototype); // if functions contains `use` the middleware can be used

    return functions.indexOf('use') > -1;
  }

}

var _default = Validator;
exports.default = _default;