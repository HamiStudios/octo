export default function getError(route) {
  const {
    path,
    Instance,
  } = route;

  const routeInstance = new Instance('/', {}, {}, () => {});

  return new Error(`The route '${routeInstance.constructor.name}' doesn't have any request methods. Failed to register endpoint '${path}'.`);
}
