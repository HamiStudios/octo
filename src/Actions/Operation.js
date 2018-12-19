// octo
import OctoAction from './Action';
import { hasFunction, hasProp } from '../internals';
import OctoMethod from '../enums/Method';
import OctoContext from '../Context';

class OctoOperation extends OctoAction {
  /**
   * Check whether the action is an OctoOperation
   *
   * @param {OctoOperation} Instance The operation to check
   *
   * @return {boolean} Whether or not it is an OctoOperation
   */
  static isOperation(Instance = null) {
    if (Instance.prototype === undefined) return false;

    const instance = new Instance();

    return Instance !== undefined
      && Instance !== null
      && instance instanceof OctoOperation
      && hasProp(Instance, 'method', 'string', true)
      && hasProp(Instance, 'path', 'string', true)
      && hasFunction(instance, 'execute', true);
  }

  /**
   * Attach the specified operation to the express server
   *
   * @param {Object} expressApp The express app instance
   * @param {OctoOperation} Instance The operation to attach
   */
  static attach(expressApp, Instance) {
    const bind = (methods = OctoMethod.values()) => {
      const getExpressCallback = pathHook => async (request, response, next) => {
        const context = new OctoContext(request, response, next, pathHook);

        if (methods.indexOf(context.getRequest().getMethod()) > -1) {
          const instance = new Instance(context);
          await instance.execute();
        }

        if (!context.getResponse().headersAreSent()
          && !context.getResponse().isRenderingView()
          && !context.isMovingToNext()) {
          context.getNextHandler()();
        }
      };

      if (Instance.path !== undefined) {
        if (Array.isArray(Instance.path)) {
          Instance.path.forEach((path) => {
            expressApp.use(
              Instance.path,
              getExpressCallback(path),
            );
          });
        } else {
          expressApp.use(
            Instance.path,
            getExpressCallback(Instance.path),
          );
        }
      } else {
        expressApp.use(
          getExpressCallback(undefined),
        );
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

export default OctoOperation;
