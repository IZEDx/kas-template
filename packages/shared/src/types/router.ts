import Router from "koa-router";
import Koa from "koa";
import {RestypedBase} from "restyped";

type HTTPMethods = "get"|"post"|"put"|"patch"|"head"|"delete"|"options";

type GetRoute<R extends Record<string, any>> = {
    body: R["response"];
    query: R["query"];
    params: R["params"];
}

type Handler<S = any, C = {}, R = {}> = (context: Omit<Koa.ParameterizedContext<S, C>, keyof R>&R, next: () => Promise<any>) => any;

export type TypedKoaRouter<Schema extends RestypedBase = any, S = any, C = {}> = Omit<Router<S, C>, HTTPMethods> & {
    get<Path extends keyof Schema>(path: Path, handler: Handler<S, C, TypedGet<Schema, Path>>): TypedKoaRouter<Schema, S, C>;
    post<Path extends keyof Schema>(path: Path, handler: Handler<S, C, TypedPost<Schema, Path>>): TypedKoaRouter<Schema, S, C>;
    put<Path extends keyof Schema>(path: Path, handler: Handler<S, C, TypedPut<Schema, Path>>): TypedKoaRouter<Schema, S, C>;
    patch<Path extends keyof Schema>(path: Path, handler: Handler<S, C, TypedPatch<Schema, Path>>): TypedKoaRouter<Schema, S, C>;
    head<Path extends keyof Schema>(path: Path, handler: Handler<S, C, TypedHead<Schema, Path>>): TypedKoaRouter<Schema, S, C>;
    delete<Path extends keyof Schema>(path: Path, handler: Handler<S, C, TypedDelete<Schema, Path>>): TypedKoaRouter<Schema, S, C>;
    options<Path extends keyof Schema>(path: Path, handler: Handler<S, C, TypedOptions<Schema, Path>>): TypedKoaRouter<Schema, S, C>;
}

export type TypedGet<S extends RestypedBase, P extends keyof S> = GetRoute<S[P]["GET"]>;
export type TypedPost<S extends RestypedBase, P extends keyof S> = S[P]["POST"];
export type TypedPut<S extends RestypedBase, P extends keyof S> = S[P]["PUT"];
export type TypedPatch<S extends RestypedBase, P extends keyof S> = S[P]["PATCH"];
export type TypedHead<S extends RestypedBase, P extends keyof S> = S[P]["HEAD"];
export type TypedDelete<S extends RestypedBase, P extends keyof S> = S[P]["DELETE"];
export type TypedOptions<S extends RestypedBase, P extends keyof S> = S[P]["OPTIONS"];