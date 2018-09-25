export default function getExpressAppInstance() {
  const ExpressApp = {
    sets: {},
    uses: [],
    engine: null,
    defaultRenderData: null,
    express: 'app',
  };

  // set
  ExpressApp.set = function setOption(name, value) {
    ExpressApp.sets[name] = value;
  };

  // get
  ExpressApp.getOption = function getOption(name) {
    return ExpressApp.sets[name];
  };

  // static
  ExpressApp.static = function serveStatic(directory) {
    return function staticHandler() {
      return directory;
    };
  };

  // use
  ExpressApp.use = function use(basePathOrHandler, handler) {
    if (typeof basePathOrHandler === 'string') {
      ExpressApp.uses.push({
        path: basePathOrHandler,
        handler, // eslint-disable-line
      });
    } else {
      ExpressApp.uses.push({
        path: null,
        handler: basePathOrHandler, // eslint-disable-line
      });
    }
  };

  // engine
  ExpressApp.engine = function setRenderEngine(name, execFunction) {
    ExpressApp.engine = {
      name,
      handler: execFunction, // eslint-disable-line
    };
  };

  // get
  ExpressApp.get = function getMethod(basePathOrHandlerOrName, handler) {
    if (typeof basePathOrHandlerOrName === 'string') {
      if (handler === undefined || handler === null) {
        return ExpressApp.getOption(basePathOrHandlerOrName);
      }

      ExpressApp.uses.push({
        path: basePathOrHandlerOrName,
        handler, // eslint-disable-line
      });
    } else {
      ExpressApp.uses.push({
        path: null,
        handler: basePathOrHandlerOrName, // eslint-disable-line
      });
    }

    return true;
  };

  return ExpressApp;
}
