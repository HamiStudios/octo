"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Action = _interopRequireDefault(require("./Action"));

var _internals = require("../internals");

var _Method = _interopRequireDefault(require("../enums/Method"));

var _Context = _interopRequireDefault(require("../Context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// octo
class OctoOperation extends _Action.default {
  /**
   * Check whether the action is an OctoOperation
   *
   * @param {OctoOperation} Instance The operation to check
   *
   * @return {boolean} Whether or not it is an OctoOperation
   */
  static isOperation(Instance = null) {
    const instance = new Instance();
    return Instance !== undefined && Instance !== null && instance instanceof OctoOperation && (0, _internals.hasProp)(Instance, 'method', 'string', true) && (0, _internals.hasProp)(Instance, 'path', 'string', false) && (0, _internals.hasFunction)(instance, 'execute', true);
  }
  /**
   * Attach the specified operation to the express server
   *
   * @param {Object} expressApp The express app instance
   * @param {OctoOperation} Instance The operation to attach
   */


  static attach(expressApp, Instance) {
    const bind = (methods = _Method.default.values()) => {
      const callback = async (request, response, next) => {
        const context = new _Context.default(request, response, next);

        if (methods.indexOf(context.getRequest().getMethod()) > -1) {
          const instance = new Instance(context);
          await instance.execute();
        }

        if (!context.getResponse().headersAreSent() && !context.isMovingToNext()) {
          context.getNextHandler()();
        }
      };

      if (Instance.path !== undefined) {
        expressApp.use(Instance.path, callback);
      } else {
        expressApp.use(callback);
      }
    };

    if (Instance.method !== undefined) {
      if (Array.isArray(Instance.method)) {
        bind(Instance.method);
      } else {
        bind([Instance.method]);
      }
    } else {
      bind();
    }
  }

}

var _default = OctoOperation;
exports.default = _default;