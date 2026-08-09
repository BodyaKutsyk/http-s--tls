import tls from 'tls'
import { readFileSync } from 'node:fs'
import { httpHandler } from "./utils/http-handler.js";

const options = {
  key: readFileSync(process.env.TLS_KEY_PATH),
  cert: readFileSync(process.env.TLS_CERT_PATH),
}

tls.createServer(options, httpHandler).listen(process.env.HTTPS_PORT)


