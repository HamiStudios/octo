export default function getError(route) {
  const {
    Instance,
  } = route;

  const handlerInstance = new Instance('', {}, {}, null);

  return new Error(`The error handler '${handlerInstance.constructor.name}' doesn't have any error handling methods. Failed to register.`);
}
