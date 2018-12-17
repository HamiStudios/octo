"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Action = _interopRequireDefault(require("./Action"));

var _internals = require("../internals");

var _Context = _interopRequireDefault(require("../Context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// octo
class OctoRoute extends _Action.default {
  /**
   * Check whether the route is an OctoRoute
   *
   * @param {OctoRoute} Instance The route to check
   *
   * @return {boolean} Whether or not it is an OctoRoute
   */
  static isRoute(Instance = null) {
    const instance = new Instance();
    return Instance !== undefined && Instance !== null && instance instanceof OctoRoute && (0, _internals.hasProp)(Instance, 'method', 'string', true, true) && (0, _internals.hasProp)(Instance, 'path', 'string', false, true) && (0, _internals.hasFunction)(instance, 'render', true) && (0, _internals.hasFunction)(instance, 'before') && (0, _internals.hasFunction)(instance, 'after');
  }
  /**
   * Attach the specified route to the express server
   *
   * @param {Object} expressApp The express app instance
   * @param {Route} Instance The route to attach
   */


  static attach(expressApp, Instance) {
    const bind = method => {
      const methodFunc = String(method).toLowerCase();
      expressApp[methodFunc](Instance.path, async (request, response, next) => {
        const context = new _Context.default(request, response, next);
        const instance = new Instance(context);

        if (instance.before !== undefined) {
          await instance.before();
        }

        await instance.render();

        if (instance.after !== undefined) {
          await instance.after();
        }

        if (!context.getResponse().headersAreSent() && !context.getResponse().isRenderingView() && !context.isMovingToNext()) {
          context.getNextHandler()();
        }
      });
    };

    if (Array.isArray(Instance.method)) {
      Instance.method.forEach(method => {
        bind(method);
      });
    } else {
      bind(Instance.method);
    }
  }

}

var _default = OctoRoute;
exports.default = _default;