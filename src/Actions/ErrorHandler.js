// octo
import OctoAction from './Action';
import { hasFunction, hasProp } from '../internals';
import OctoMethod from '../enums/Method';
import OctoContext from '../Context';

class OctoErrorHandler extends OctoAction {
  /**
   * Check whether the handler is an OctoErrorHandler
   *
   * @param {OctoErrorHandler} Instance The handler to check
   *
   * @return {boolean} Whether or not it is an OctoErrorHandler
   */
  static isHandler(Instance = null) {
    const instance = new Instance();

    return Instance !== undefined
      && Instance !== null
      && instance instanceof OctoErrorHandler
      && hasProp(Instance, 'error', 'number', true, true)
      && hasProp(Instance, 'method', 'string', true)
      && hasProp(Instance, 'path', 'string', true)
      && hasFunction(instance, 'handle', true);
  }

  /**
   * Attach the specified handler to the express server
   *
   * @param {Object} expressApp The express app instance
   * @param {OctoErrorHandler} Instance The handler to attach
   */
  static attach(expressApp, Instance) {
    const bind = (methods = OctoMethod.values()) => {
      const callback = async (request, response, next) => {
        const context = new OctoContext(request, response, next);

        const handleError = async (errors) => {
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

        if (!context.getResponse().headersAreSent()
            && !context.getResponse().isRenderingView()
            && !context.isMovingToNext()) {
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

export default OctoErrorHandler;
