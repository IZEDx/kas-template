import Koa from "koa";
import Router from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import serveStatic from "koa-static";
import { join } from "path";
import socketIo from "socket.io";

import {helloWorld, TypedSocketServer, SocketSchema} from "@kas/shared";
import { createApi } from "./api";
import { readFile, log } from "./libs/utils";
import { createServer } from "http";
import { onConnection } from "./socket";
import { ConfigProvider } from "@kas/config/provider";

const frontEndDir = join(__dirname, "..", "..", "frontend", "www");
const staticExtensions = ["js", "map", "html", "json", "css", "ico", "png", "jpg"];

export async function main()
{
    log.title = "kas-template";

    log.main("Initializing...");

    const app = new Koa();
    const router = new Router();
    const api = new Router();
    const port = parseInt(process.env.PORT) || 3000;
    const config = await ConfigProvider.create(api);


    await createApi(api, config);
    
    app.use(json());
    app.use(logger());

    app.use(serveStatic(frontEndDir, {
        extensions: staticExtensions
    }));

    router.use("/api", api.routes(), api.allowedMethods());
    app.use(router.routes()).use(router.allowedMethods());

    app.use(async (ctx, next) => {
        if (ctx.path.startsWith("/api") || staticExtensions.filter(e => ctx.path.endsWith(e)).length > 0)
        {
            return next();
        }

        log.debug(`404: ${ctx.path}`);

        ctx.status = 200;
        ctx.body = (await readFile(join(frontEndDir, "index.html"))).toString();
    });
    
    const server = createServer(app.callback());
    const io = socketIo(server) as TypedSocketServer<SocketSchema>;
    io.on('connection', onConnection);

    server.listen(port, () => {
        log.main(`Server started on port ${port}`);
    });

    log.debug(config.get("test"));
    log.debug(helloWorld);
}
 