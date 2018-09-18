// npm
import express from 'express';

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
              const context = new OctoRouteContext(routePath, request, response, nextHandler);

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
}

export default ServerHelper;
