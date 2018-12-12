// octo
import Action from './Action';
import { hasFunction, hasProp } from '../internals';
import Method from '../enums/Method';
import Context from '../Context';

class Operation extends Action {
  /**
   * Check whether the action is an OctoOperation
   *
   * @param {Operation} Instance The operation to check
   *
   * @return {boolean} Whether or not it is an OctoOperation
   */
  static isOperation(Instance = null) {
    const instance = new Instance();

    return Instance !== undefined
      && Instance !== null
      && instance instanceof Operation
      && hasProp(Instance, 'method', 'string', true)
      && hasProp(Instance, 'path', 'string', false)
      && hasFunction(instance, 'execute', true);
  }

  /**
   * Attach the specified operation to the express server
   *
   * @param {Object} expressApp The express app instance
   * @param {Operation} Instance The operation to attach
   */
  static attach(expressApp, Instance) {
    const bind = (methods = Method.values()) => {
      const callback = async (request, response, next) => {
        const context = new Context(request, response, next);

        if (methods.indexOf(context.getRequest().getMethod()) > -1) {
          const instance = new Instance(context);
          await instance.execute();
        }

        if (!context.getResponse().headersAreSent()
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

export default Operation;
