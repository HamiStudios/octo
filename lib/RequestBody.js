"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var o = _interopRequireWildcard(require("o"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// npm
class OctoRequestBody {
  /**
   * Create a new OctoRequestBody instance
   *
   * @param {Object} body The request body from express
   */
  constructor(body) {
    this.body = body;
  }
  /**
   * Get the raw body object
   *
   * @return {Object} The raw body object from express
   */


  raw() {
    return this.body;
  }
  /**
   * Get a value from the body using dot notation
   *
   * @param {string} path The path to the value in the body using dot notation
   * @param {*} [defaultValue=null] The default value to return if the value doesn't exist
   *                                in the body
   *
   * @return {*} The value from the path in the body or the default value if it doesn't exist
   */


  get(path, defaultValue = null) {
    return o.get(this.body, path, defaultValue);
  }
  /**
   * Check if a value exists in the body using dot notation
   *
   * @param {string} path The path to check in the body using dot notation
   *
   * @return {boolean} Whether or not the value exists
   */


  exists(path) {
    return o.has(this.body, path);
  }
  /**
   * Check if the body only contains the specified paths
   *
   * @param {...string} paths The paths to check in dot notation
   *
   * @return {boolean} Whether the body only contains the specified paths
   */


  onlyHas(...paths) {
    let invalid = false;
    o.each(this.body, k => {
      if (paths.indexOf(k) === -1) {
        invalid = true;
      }
    }, true);
    return !invalid;
  }

}

var _default = OctoRequestBody;
exports.default = _default;