import { Router } from "./router.js";
import parseRawHttp from "./parsers/parse-raw-http.js";
import getRequestLine from "./getters/get-request-line.js";
import getHeadersObject from "./getters/get-headers-object.js";

export const httpHandler = (socket) => {
  const router = new Router(socket);
  let rawData = '';

  router.get('/', (req, res) => {
    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.send();
  })


  router.get('/headers', (req, res) => {
    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.send(JSON.stringify(req.headers));
  })

  socket.on('data', (chunk) => {
    try {
      rawData += chunk.toString();

      if (rawData.includes('\r\n\r\n')) {
        const {  requestBody, rawRequestLine, rawHeaders } = parseRawHttp(rawData);
        const { method, path } = getRequestLine(rawRequestLine);
        const headers = getHeadersObject(rawHeaders);

        router.handle({ path, method, headers, body: requestBody})
        rawData = '';
      }
    } catch {
      router.internalServerError();
      rawData = ''
    }
  })

  socket.on('error', () => {
    router.internalServerError();
  })
}