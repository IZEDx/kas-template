import Koa from "koa";
import Router from "koa-router";
import logger from "koa-logger";
import json from "koa-json";

import {helloWorld} from "@kas/shared";


export async function main()
{
    const app = new Koa();
    const router = await createRouter();
    const port = parseInt(process.env.PORT) || 3000;

    app.use(json());
    app.use(logger());

    app.use(router.routes()).use(router.allowedMethods());

    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    })

    console.log(helloWorld);
}

async function createRouter()
{
    const router = new Router();

    router.get("/", async (ctx, next) => {
        ctx.body = { msgFromShared: helloWorld }
        await next();
    });

    return router;
}