function getError(route) {
  const {
    Instance,
  } = route;

  const routeInstance = new Instance();

  return new Error(`The middleware '${routeInstance.constructor.name}' doesn't have a 'use' method. Failed to register the middleware.`);
}

export default getError;
