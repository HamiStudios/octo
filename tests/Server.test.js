// lib
import OctoServer from '../src/Server';
import OctoRouter from '../src/Router';
import OctoRoute from '../src/Route';
import OctoMiddleware from '../src/Middleware';
import OctoProtocol from '../src/enums/Protocol';

// mocks
import expressApp from './__mocks__/expressApp.mock';

class ValidTestRoute extends OctoRoute {
  get() {} // eslint-disable-line
}
class FakeTestRoute {}

class ValidTestMiddleware extends OctoMiddleware {
  use() {} // eslint-disable-line
}
class FakeTestMiddleware {}

let server = null;

beforeEach(() => {
  server = new OctoServer();
  server.expressApp = expressApp();
});

test('Creating a server with no options should use the default options', () => {
  expect(server.options).toEqual(server.defaultServerOptions);
});

test('Creating a server with options should override the default options', () => {
  const testServer = new OctoServer({
    protocol: OctoProtocol.HTTPS,
  });

  const newOptions = server.defaultServerOptions;
  newOptions.protocol = OctoProtocol.HTTPS;

  expect(testServer.options).toEqual(newOptions);
});

test('.router() should return true when adding a valid router', () => {
  const router = new OctoRouter('/');

  expect(server.router(router)).toBeTruthy();
});

test('.router() should return false when adding a invalid router', () => {
  const router = { some: 'random thing' };

  expect(server.router(router)).toBeFalsy();
});

test('.router() should add valid routers to the stack', () => {
  const router = new OctoRouter('/');
  server.router(router);

  expect(server.routers).toHaveLength(1);
});

test('.route() should return true when adding a valid route', () => {
  expect(server.route('/', ValidTestRoute)).toBeTruthy();
});

test('.route() should return false when adding a invalid route', () => {
  expect(server.route('/', FakeTestRoute)).toBeFalsy();
});

test('.route() should add valid routers to the stack', () => {
  server.route('/', ValidTestRoute);

  expect(server.routes).toHaveLength(1);
});

test('.middleware() should return true when adding a valid middleware', () => {
  expect(server.middleware(ValidTestMiddleware)).toBeTruthy();
});

test('.middleware() should return false when adding a invalid middleware', () => {
  expect(server.middleware(FakeTestMiddleware)).toBeFalsy();
});

test('.middleware() should add valid middlewares to the stack', () => {
  server.middleware(ValidTestMiddleware);

  expect(server.middlewares).toHaveLength(1);
});

test('.set() should set the specified value using the specified name', () => {
  server.set('test', 'testing');

  expect(server.expressApp.sets.test).toBe('testing');
});

test('.get() should get the specified value using the specified name', () => {
  server.expressApp.sets.test = 'testing';

  expect(server.get('test')).toBe('testing');
});

test('.static() should serve a directory', () => {
  server.static('/test/directory/path');

  expect(server.expressApp.uses).toHaveLength(1);
});

test('.static() should serve a directory at the specified base path', () => {
  server.static('/test/directory/path', '/assets');

  expect(server.expressApp.uses[0].path).toBe('/assets');
});

test('.staticModule() should serve a module', () => {
  server.staticModule('jest');

  expect(server.expressApp.uses).toHaveLength(1);
});

test('.staticModule() should serve a module at the specified base path', () => {
  server.staticModule('jest', '/assets');

  expect(server.expressApp.uses[0].path).toBe('/assets/jest');
});

test('.staticModule() should serve a multiple modules when specified', () => {
  server.staticModule([
    'jest',
    'eslint',
  ]);

  expect(server.expressApp.uses).toHaveLength(2);
});

test('.staticModule() should serve a multiple modules at the base path when specified', () => {
  server.staticModule([
    'jest',
    'eslint',
  ], '/assets');

  let atPath = true;

  server.expressApp.uses.forEach((use) => {
    if (!use.path.startsWith('/assets')) atPath = false;
  });

  expect(atPath).toBeTruthy();
});

test('.setRenderEngine() should set the engine and view engine value', () => {
  server.setRenderEngine('testEngine', () => {});

  expect(server.expressApp.engine.name === 'testEngine'
    && server.expressApp.sets['view engine'] === 'testEngine').toBeTruthy();
});

test('.setDefaultRenderData() should set the defaultRenderData data to the specified value', () => {
  server.setDefaultRenderData({
    testing: true,
  });

  expect(server.expressApp.defaultRenderData.testing).toBeTruthy();
});
