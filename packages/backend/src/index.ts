import Koa from "koa";
import Router from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import serveStatic from "koa-static";
import { join } from "path";

import {helloWorld} from "@kas/shared";
import { createApi } from "./api";

const frontEndDir = join(__dirname, "..", "..", "frontend", "www");

export async function main()
{
    const app = new Koa();
    const router = new Router();
    const api = new Router();
    const port = parseInt(process.env.PORT) || 3000;

    await createApi(api);
    
    app.use(json());
    app.use(logger());

    app.use(serveStatic(frontEndDir));

    router.use("/api", api.routes(), api.allowedMethods());
    app.use(router.routes()).use(router.allowedMethods());

    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    })

    console.log(helloWorld);
}
