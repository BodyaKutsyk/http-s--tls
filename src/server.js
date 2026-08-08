import net from 'net'
import { httpHandler } from "./utils/http-handler.js";

const server = net.createServer(httpHandler);

server.listen(3000)
