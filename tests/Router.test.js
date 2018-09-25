// lib
import OctoRouter from '../src/Router';
import OctoRoute from '../src/Route';
import OctoMiddleware from '../src/Middleware';

class ValidTestRoute extends OctoRoute {
  get() {} // eslint-disable-line
}
class FakeTestRoute {}

class ValidTestMiddleware extends OctoMiddleware {
  use() {} // eslint-disable-line
}
class FakeTestMiddleware {}

let router = null;

beforeEach(() => {
  router = new OctoRouter('/');
});

test('.getBasePath() should return a string', () => {
  expect(typeof router.getBasePath()).toBe('string');
});

test('.route() should return true when adding a valid route', () => {
  expect(router.route('/valid', ValidTestRoute)).toBeTruthy();
});

test('.route() should return false when adding a invalid route', () => {
  expect(router.route('/invalid', FakeTestRoute)).toBeFalsy();
});

test('.route() should add valid routes to the stack', () => {
  router.route('/valid', ValidTestRoute);

  expect(router.routes).toHaveLength(1);
});

test('.route() should skip invalid routes', () => {
  router.route('/invalid', FakeTestRoute);

  expect(router.routes).toHaveLength(0);
});

test('.getRoutes() should return an of array', () => {
  expect(Array.isArray(router.getRoutes())).toBeTruthy();
});

test('.middleware() should return true when adding a valid middleware', () => {
  expect(router.middleware(ValidTestMiddleware)).toBeTruthy();
});

test('.middleware() should return false when adding a invalid middleware', () => {
  expect(router.middleware(FakeTestMiddleware)).toBeFalsy();
});

test('.middleware() should add valid middlewares to the stack', () => {
  router.middleware(ValidTestMiddleware);

  expect(router.middlewares).toHaveLength(1);
});

test('.middleware() should skip invalid middlewares', () => {
  router.middleware(FakeTestMiddleware);

  expect(router.middlewares).toHaveLength(0);
});

test('.getMiddlewares() should return an of array', () => {
  expect(Array.isArray(router.getMiddlewares())).toBeTruthy();
});
