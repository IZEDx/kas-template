import { APISchema, helloWorld, TypedKoaRouter } from "@kas/shared";
import { ConfigProvider } from "@kas/config/provider";

export function createApi(router: TypedKoaRouter<APISchema>, config: ConfigProvider)
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
