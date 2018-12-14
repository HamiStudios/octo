// octo
import OctoAction from './Action';
import { hasProp, hasFunction } from '../internals';
import OctoContext from '../Context';

class OctoRoute extends OctoAction {
  /**
   * Check whether the route is an OctoRoute
   *
   * @param {OctoRoute} Instance The route to check
   *
   * @return {boolean} Whether or not it is an OctoRoute
   */
  static isRoute(Instance = null) {
    const instance = new Instance();

    return Instance !== undefined
      && Instance !== null
      && instance instanceof OctoRoute
      && hasProp(Instance, 'method', 'string', true, true)
      && hasProp(Instance, 'path', 'string', false, true)
      && hasFunction(instance, 'render', true)
      && hasFunction(instance, 'before')
      && hasFunction(instance, 'after');
  }

  /**
   * Attach the specified route to the express server
   *
   * @param {Object} expressApp The express app instance
   * @param {Route} Instance The route to attach
   */
  static attach(expressApp, Instance) {
    const bind = (method) => {
      const methodFunc = String(method).toLowerCase();

      expressApp[methodFunc](
        Instance.path,
        async (request, response, next) => {
          const context = new OctoContext(request, response, next);
          const instance = new Instance(context);

          if (instance.before !== undefined) {
            await instance.before();
          }

          await instance.render();

          if (instance.after !== undefined) {
            await instance.after();
          }

          if (!context.getResponse().headersAreSent()
              && !context.getResponse().isRenderingView()
              && !context.isMovingToNext()) {
            context.getNextHandler()();
          }
        },
      );
    };

    if (Array.isArray(Instance.method)) {
      Instance.method.forEach((method) => {
        bind(method);
      });
    } else {
      bind(Instance.method);
    }
  }
}

export default OctoRoute;
