import checkIsJSON from "./validators/checkIsJSON.js";
import serializeStatusLine from "./serializers/serialize-status-line.js";
import serializeHeaders from "./serializers/serialize-headers.js";
import getHttpResponse from "./getters/get-http-response.js";

export class Router {
  _socket = null;
  _routes = {
    get: {},
    post: {},
    patch: {},
    put: {},
    delete: {},
  }

  constructor(socket) {
    this._socket = socket;
  }

  _checkInitialization () {
    return !!this._socket;
  }

  _prepareRequest({path, method, body, headers}) {
    return {
      path,
      method,
      body,
      headers
    };
  }
  _prepareResponse() {
    const socket = this._socket;
    return {
      headers: {},
      statusCode: null,
      statusMessage: "",
      send(data = '') {
        const isJSON = checkIsJSON(data);
        let length = 0;

        if (isJSON) {
          length = Buffer.byteLength(data + '\r\n')
          this.headers['Content-Type'] = 'application/json';
        } else if (typeof data === 'string') {
          if (data) {
            length = Buffer.byteLength(data + '\r\n');
          }
          this.headers['Content-Type'] = 'text/plain';
        }

        this.headers['Content-Length'] = length;

        const serializedStatusLine = serializeStatusLine({
          statusCode: this.statusCode,
          reasonPhrase: this.statusMessage
        });
        const serializedHeaders = serializeHeaders(this.headers)
        const response = getHttpResponse({statusLine: serializedStatusLine, headers: serializedHeaders, body: data})
        socket.write(response);
      },
    };
  }


  get(path, callback) {
    if (this._checkInitialization()) {
      if (this._routes.get[path]) {
        throw Error('The route has already been added');
      }
      this._routes.get[path] = callback;
    }
  }

  handle({ path, method, headers, body }) {
    if (this._checkInitialization()) {
      const normalizedPath = path.toLowerCase();
      const normalizedMethod = method.toLowerCase();
      const response = this._prepareResponse();

      if (!this._routes[normalizedMethod]) {
        response.statusCode = 400;
        response.statusMessage = 'Bad Request';
        response.send();

        return;
      }

      const pathExists = Object.values(this._routes).some(method => normalizedPath in method);

      if (!(normalizedPath in this._routes[normalizedMethod]) && pathExists) {
        response.statusCode = 405;
        response.statusMessage = 'Method Not Allowed';
        response.send();

        return;
      }

      const request = this._prepareRequest({ path, method, headers, body });

      if (this._routes[normalizedMethod][normalizedPath]) {
        this._routes[normalizedMethod][normalizedPath](request, response);
      } else if (this._routes[normalizedMethod]['*']) {
        this._routes[normalizedMethod]['*'](request, response);
      } else {
        response.statusCode = 404;
        response.statusMessage = 'Not Found';
        response.send();
      }
    }
  }
  internalServerError() {
    const response = this._prepareResponse();
    response.statusCode = 500;
    response.statusMessage = 'Internal Server Error';
    response.send();
  }
}
