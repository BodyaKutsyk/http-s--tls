import tls from 'tls'
import { readFileSync } from 'node:fs'
import {Router} from "./utils/router.js";
import parseRawHttp from "./utils/parsers/parse-raw-http.js";
import getRequestLine from "./utils/getters/get-request-line.js";
import getHeadersObject from "./utils/getters/get-headers-object.js";

const options = {
  key: readFileSync('private-key.pem'),
  cert: readFileSync('cert.pem'),
}

const server = tls.createServer(options, (socket) => {
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
    rawData += chunk.toString();

    if (rawData.includes('\r\n\r\n')) {
      const {  requestBody, rawRequestLine, rawHeaders } = parseRawHttp(rawData);
      const { method, path } = getRequestLine(rawRequestLine);
      const headers = getHeadersObject(rawHeaders);

      router.handle({ path, method, headers, body: requestBody})
    }
  })
})
server.listen(3000);


