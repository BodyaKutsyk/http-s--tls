import net from 'net'
import { httpHandler } from "./utils/http-handler.js";

net.createServer(httpHandler).listen(process.env.HTTP_PORT);
