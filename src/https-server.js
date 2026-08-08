import tls from 'tls'
import { readFileSync } from 'node:fs'
import { httpHandler } from "./utils/http-handler.js";

const options = {
  key: readFileSync('private-key.pem'),
  cert: readFileSync('cert.pem'),
}

const server = tls.createServer(options, httpHandler)
server.listen(3000);


