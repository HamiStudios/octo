// npm
import express from 'express';

// lib
import OctoRequest from '../Request';
import OctoResponse from '../Response';
import OctoExpressContext from '../ExpressContext';

// enums
import OctoMethod from '../enums/Method';
import OctoStatusCode from '../enums/StatusCode';

// util
import Validator from './Validator';

// errors
import NoRequestMethod from '../errors/NoRequestMethod';
import NoMiddlewareMethod from '../errors/NoMiddlewareMethod';
import NoErrorHandlingMethod from '../errors/NoErrorHandlingMethod';


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
        routePath,
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
            expressApp[method](routePath, (expressRequest, expressResponse, nextHandler) => {
              // create the request and response instances
              const request = new OctoRequest(expressRequest);
              const response = new OctoResponse(expressResponse);

              // create the route context
              const context = new OctoExpressContext(request, response, nextHandler);

              // create the route instance
              const routeInstance = new Instance(routePath, context);

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

  /**
   * Add an array of middlewares to the specified express app
   *
   * @param {Express} expressApp The express app
   * @param {OctoMiddleware[]} middlewares The middlewares
   */
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
          const context = new OctoExpressContext(request, response, nextHandler);

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

  /**
   * Add an array of routes to the specified express app
   *
   * @param {Express} expressApp The express app
   * @param {OctoRouter[]} routers The routers
   */
  static addRouters(expressApp, routers) {
    routers.forEach((router) => {
      const expressRouter = express.Router();
      const middlewares = router.getMiddlewares();
      const routes = router.getRoutes();

      // add the middlewares which run before the routes to the router
      this.addMiddlewares(
        expressRouter,
        middlewares.filter(mw => mw.afterRoutes === false),
      );

      // add the routes to the router
      this.addRoutes(expressRouter, routes);

      // add the middlewares which run after the routes to the router
      this.addMiddlewares(
        expressRouter,
        middlewares.filter(mw => mw.afterRoutes === true),
      );

      expressApp.use(router.getBasePath(), expressRouter);
    });
  }

  /**
   * Add an array of error handlers to the specified express app
   *
   * @param {Express} expressApp The express app
   * @param {OctoErrorHandler[]} errorHandlers The error handlers
   */
  static addErrorHandlers(expressApp, errorHandlers) {
    // get an array of all error codes
    const codes = OctoStatusCode.values().map(code => code.toLowerCase());

    // for each error handler
    errorHandlers.forEach((errorHandler) => {
      const {
        routePath,
        Instance,
      } = errorHandler;

      // check if the route has any error handling functions
      if (Validator.hasErrorHandlerMethod(Instance)) {
        // get all the functions
        const functions = Object.getOwnPropertyNames(Instance.prototype);

        // for each error code
        codes.forEach((code) => {
          // check if the error handler has a function for the code
          if (functions.indexOf(code.toString()) > -1) {
            // if it does add it to the express routes for that error code
            const expressFunction = (expressRequest, expressResponse, nextHandler) => {
              if (expressResponse.statusCode === 200) {
                // since error handlers are added last and the status is still 200
                // this means that there was no route therefore its a 404
                expressResponse.status(404);
              }

              // create the request and response instances
              const request = new OctoRequest(expressRequest);
              const response = new OctoResponse(expressResponse);

              // check if the current status code is the error handler status code
              if (OctoStatusCode.valueOf(code).toString() === response.getStatus().toString()) {
                // create the route context
                const context = new OctoExpressContext(request, response, nextHandler);

                // create the handler instance
                let handlerInstance = null;

                if (routePath !== null) {
                  handlerInstance = new Instance(routePath, context);
                } else {
                  handlerInstance = new Instance(context);
                }

                // run the error code function
                handlerInstance[code]();
              } else {
                nextHandler();
              }
            };

            if (routePath !== null) {
              expressApp.use(routePath, expressFunction);
            } else {
              expressApp.use(expressFunction);
            }
          }
        });
      } else {
        throw NoErrorHandlingMethod(errorHandler);
      }
    });
  }
}

export default ServerHelper;
