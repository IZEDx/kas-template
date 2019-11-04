import Router from "koa-router";
import Koa from "koa";
import {RestypedIndexedBase, RestypedRoute, RestypedBase} from "restyped";

type HTTPMethods = "get"|"post"|"put"|"patch"|"head"|"delete"|"options";

type GetRoute<R extends Record<string, any>> = {
    body: R["response"];
    query: R["query"];
    params: R["params"];
}

declare type TypedRouter<Schema extends RestypedBase = any, S = any, C = {}> = Omit<Router<S, C>, HTTPMethods> & {
    get<Path extends keyof Schema>(path: Path, handler: Koa.Middleware<S, GetRoute<Schema[Path]["GET"]>>): TypedRouter<Schema, S, C>;
    post<Path extends keyof Schema>(path: Path, handler: Koa.Middleware<S, C & Schema[Path]["POST"]>): TypedRouter<Schema, S, C>;
    put<Path extends keyof Schema>(path: Path, handler: Koa.Middleware<S, C & Schema[Path]["PUT"]>): TypedRouter<Schema, S, C>;
    patch<Path extends keyof Schema>(path: Path, handler: Koa.Middleware<S, C & Schema[Path]["PATCH"]>): TypedRouter<Schema, S, C>;
    head<Path extends keyof Schema>(path: Path, handler: Koa.Middleware<S, C & Schema[Path]["HEAD"]>): TypedRouter<Schema, S, C>;
    delete<Path extends keyof Schema>(path: Path, handler: Koa.Middleware<S, C & Schema[Path]["DELETE"]>): TypedRouter<Schema, S, C>;
    options<Path extends keyof Schema>(path: Path, handler: Koa.Middleware<S, C & Schema[Path]["OPTIONS"]>): TypedRouter<Schema, S, C>;
}
