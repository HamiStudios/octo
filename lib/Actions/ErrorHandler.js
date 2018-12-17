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
class OctoErrorHandler extends _Action.default {
  /**
   * Check whether the handler is an OctoErrorHandler
   *
   * @param {OctoErrorHandler} Instance The handler to check
   *
   * @return {boolean} Whether or not it is an OctoErrorHandler
   */
  static isHandler(Instance = null) {
    const instance = new Instance();
    return Instance !== undefined && Instance !== null && instance instanceof OctoErrorHandler && (0, _internals.hasProp)(Instance, 'error', 'number', true, true) && (0, _internals.hasProp)(Instance, 'method', 'string', true) && (0, _internals.hasProp)(Instance, 'path', 'string', false) && (0, _internals.hasFunction)(instance, 'handle', true);
  }
  /**
   * Attach the specified handler to the express server
   *
   * @param {Object} expressApp The express app instance
   * @param {OctoErrorHandler} Instance The handler to attach
   */


  static attach(expressApp, Instance) {
    const bind = (methods = _Method.default.values()) => {
      const callback = async (request, response, next) => {
        const context = new _Context.default(request, response, next);

        const handleError = async errors => {
          if (errors.indexOf(context.getResponse().getStatus()) > -1) {
            const instance = new Instance(context);
            await instance.handle();
          }
        };

        if (methods.indexOf(context.getRequest().getMethod()) > -1) {
          if (Array.isArray(Instance.error)) {
            await handleError(Instance.error);
          } else {
            await handleError([Instance.error]);
          }
        }

        if (!context.getResponse().headersAreSent() && !context.getResponse().isRenderingView() && !context.isMovingToNext()) {
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

var _default = OctoErrorHandler;
exports.default = _default;