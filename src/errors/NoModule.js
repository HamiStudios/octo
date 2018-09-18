export default function getError(module) {
  return new Error(`The module '${module}' either doesn't exist or is not installed. Failed to serve '${module}' as static files.`);
}
