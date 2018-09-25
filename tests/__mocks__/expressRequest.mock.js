const ExpressRequest = {
  body: {
    text: 'Text inside POST body',
  },
  hostname: 'example.com',
  ip: '0.0.0.0',
  method: 'GET',
  originalUrl: 'http://www.example.com/1',
  params: {
    id: '1',
  },
  path: '/1',
  protocol: 'http',
  query: {
    q: 'search query',
  },
  route: {
    path: '/:id',
  },
  subdomains: [
    'www',
  ],
  xhr: false,
  headers: {
    'x-test-header': 'test header value',
  },
  express: 'request',
};

// getHeader
ExpressRequest.get = function get(name) {
  return ExpressRequest.headers[name];
};

export default ExpressRequest;
