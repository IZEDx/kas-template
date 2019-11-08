import { APISchema, helloWorld, TypedRouter } from "@kas/shared";

export function createApi(router: TypedRouter<APISchema>)
{
    router.get("/", async (ctx, next) => {
        ctx.body = { msgFromShared: helloWorld }
        await next();
    });

    router.get("/foo", async (ctx, next) => {
        ctx.body = { bar: "BAR" }
        await next();
    });
}
