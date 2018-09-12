// lib
import OctoRequest from '../Request';
import OctoResponse from '../Response';
import OctoRouteContext from '../RouteContext';
import OctoMiddlewareContext from '../MiddlewareContext';

// enums
import OctoMethod from '../enums/Method';

// util
import Validator from './Validator';

// errors
import NoRequestMethod from '../errors/NoRequestMethod';
import NoMiddlewareMethod from '../errors/NoMiddlewareMethod';


class ServerHelper {
  /**
   * Add an array of routes to the specified express app
   *
   * @param {Express} expressApp The express app
   * @param {OctoRoute[]} routes The routes
   */
  static addRoutes(expressApp, routes) {
    // get an array of all method names in lowercase
    const methods = OctoMethod.values().map(method => method.toLowerCase());

    // for each route
    routes.forEach((route) => {
      const {
        path,
        Instance,
      } = route;

      // check if the route has any request method functions
      if (Validator.hasRequestMethod(Instance)) {
        // get all the functions
        const functions = Object.getOwnPropertyNames(Instance.prototype);

        // for each methods
        methods.forEach((method) => {
          // check if the route has a function for the method
          if (functions.indexOf(method) > -1) {
            // if it does add it to the express routes for that method
            expressApp[method](path, (expressRequest, expressResponse, nextHandler) => {
              // create the request and response instances
              const request = new OctoRequest(expressRequest);
              const response = new OctoResponse(expressResponse);

              // create the route context
              const context = new OctoRouteContext(path, request, response, nextHandler);

              // create the route instance
              const routeInstance = new Instance(context);

              // run the method function
              routeInstance[method]();
            });
          }
        });
      } else {
        throw NoRequestMethod(route);
      }
    });
  }

  static addMiddlewares(expressApp, middlewares) {
    // for each middleware
    middlewares.forEach((middleware) => {
      const {
        Instance,
      } = middleware;

      // check if the middleware has the 'use' function
      if (Validator.hasMiddlewareMethod(Instance)) {
        // register the middleware
        expressApp.use((expressRequest, expressResponse, nextHandler) => {
          // create the request and response instances
          const request = new OctoRequest(expressRequest);
          const response = new OctoResponse(expressResponse);

          // create the route context
          const context = new OctoMiddlewareContext(request, response, nextHandler);

          // create the route instance
          const routeInstance = new Instance(context);

          // run the use function
          routeInstance.use();
        });
      } else {
        throw NoMiddlewareMethod(middleware);
      }
    });
  }
}

export default ServerHelper;
